const _           = require('underscore');
const es          = require('event-stream');
const frontMatter = require('gulp-front-matter');
const fs          = require('fs');
const gulp        = require('gulp');
const mkdirp      = require('mkdirp');
const moment      = require('moment');
const path        = require('path');

const posts = {};

// Source:
// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
posts.toSlug = str => {
  str = str
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to   = "aaaaaeeeeeiiiiooooouuuunc------";
  Array.prototype.forEach.call(from, (ch, i) => {
    str = str.replace(new RegExp(ch, 'g'), to.charAt(i));
  })

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

posts.getPosts = options => {
  return gulp.src(path.join(options.postsDir, options.postsPattern))
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }));
};

posts.generateSlug = () => {
  return es.map((post, callback) => {
    const { title } = post.frontMatter;

    // Rather than error out and halt the stream, send back the original post if there is not title
    if (!title) {
      return callback(null, post);
    }

    callback(null, Object.assign(post, { slug: posts.toSlug(title) }));
  });
};

posts.buildPermalinks = options => {
  return es.map((data, callback) => {
    const { slug } = data;
    const { title } = data.frontMatter;

    mkdirp.sync(path.join(options.outputDir, "blog", slug));
    callback(null, Object.assign(data, { [slug]: posts.toSlug(title) }));
  });
};

posts.buildCategories = options => {
  return es.map((data, callback) => {
    if (options.categories) {
      mkdirp.sync(path.join(options.outputDir, "categories"));

      const input = (data.frontMatter.categories || '').split(/[, ]/);
      const postCategories = _.chain(input)
        .map(part => part.trim())
        .reject(part => part.length === 0)
        .value();

      _.each(postCategories, (category) => {
        mkdirp.sync(path.join(
          options.outputDir,
          'categories',
          category,
          data.slug
        ));
      });

      data.categories = postCategories;
    }

    callback(null, data);
  });
};

posts.templatize = templates => {
  return es.map((post, callback) => {
    const template = templates[(post.frontMatter.template || 'post')];
    if (template) {
      post.contents = new Buffer(template({
        categories: post.frontMatter.categories || '',
        contents: post.contents.toString(),
        date: post.frontMatter.date,
        moment,
        og_image: post.frontMatter.og_image || '',
        slug: post.slug,
        summary: post.frontMatter.summary || '',
        title: post.frontMatter.title,
      }));
    }

    callback(null, post);
  });
};

posts.write = options => {
  return es.map((post, callback) => {
    // Write to the post's path
    fs.writeFileSync(
      path.join(options.outputDir, "blog", post.slug, 'index.html'),
      post.contents
    );

    if (options.categories) {
      // Add this post to the right folder for each of its categories
      _.each(post.categories, category => {
        fs.writeFileSync(
          path.join(
            options.outputDir,
            'categories',
            category,
            post.slug,
            'index.html'
          ),
          post.contents
        );
      });
    }

    callback(null, post);
  });
};

module.exports = posts;
