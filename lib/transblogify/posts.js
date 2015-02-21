var gulp        = require('gulp');
var frontMatter = require('gulp-front-matter');

var es          = require('event-stream');
var mkdirp      = require('mkdirp');
var path        = require('path');
var _           = require('underscore');
var fs          = require('fs');
var moment      = require('moment');

var posts = {};

// Source:
// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
posts.toSlug = function (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

posts.getPosts = function (options) {
  return gulp.src(path.join(options.postsDir, options.postsPattern))
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }));
};

posts.generateSlug = function () {
  return es.map(function (post, cb) {
    var title = post.frontMatter.title;

    if (title && title.length > 0) {
      post.slug = posts.toSlug(title);
      cb(null, post);
    } else {
      cb(new Error('A post requires a title!'));
    }
  });
};

posts.buildPermalinks = function (options) {
  return es.map(function (data, cb) {
    var slug = data.slug;
    var title = data.frontMatter.title;

    mkdirp.sync(path.join(options.outputDir, "blog", slug));
    console.log("Created folder for " + slug);

    data.slug = posts.toSlug(title);
    cb(null, data);
  });
};

posts.buildCategories = function (options) {
  return es.map(function (data, cb) {
    if (options.categories) {
      mkdirp.sync(path.join(options.outputDir, "categories"));

      var postCategories = _.chain((data.frontMatter.categories || '').split(/[, ]/))
        .map(function (part) { return part.trim(); })
        .reject(function (part) { return part.length === 0; })
        .value();

      _.each(postCategories, function (category) {
        mkdirp.sync(path.join(options.outputDir, 'categories', category, data.slug));
      });

      data.categories = postCategories;
    }

    cb(null, data);
  });
};

posts.templatize = function (templates) {
  return es.map(function (post, cb) {
    var template = templates[(post.frontMatter.template || 'post')];
    if (template) {
      post.contents = new Buffer(template({
        title: post.frontMatter.title,
        date: post.frontMatter.date,
        moment: moment,
        contents: post.contents.toString(),
        categories: post.frontMatter.categories || '',
        summary: post.frontMatter.summary || ''
      }));
    }

    cb(null, post);
  });
};

posts.write = function (options) {
  return es.map(function (post, cb) {
    // Write to the post's path
    fs.writeFileSync(path.join(options.outputDir, "blog", post.slug, 'index.html'), post.contents);

    if (options.categories) {
      // Add this post to the right folder for each of its categories
      _.each(post.categories, function (category) {
        fs.writeFileSync(path.join(options.outputDir, 'categories', category, post.slug, 'index.html'),
          post.contents);
      });
    }

    cb(null, post);
  });
};

module.exports = posts;
