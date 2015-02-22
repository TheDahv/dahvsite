var gulp        = require('gulp');
var markdown    = require('gulp-markdown');
var frontMatter = require('gulp-front-matter');
var reduce      = require('stream-reduce');

var w           = require('when');
var _           = require('underscore');
var path        = require('path');
var mkdirp      = require('mkdirp');
var fs          = require('fs');
var es          = require('event-stream');

var posts       = require('./posts');
var pages       = require('./pages');

transblogify = {};

var defaults = {
  'postsDir': 'posts',
  'postsPattern': '*.md',
  'pagesDir': 'pages',
  'outputDir': 'build',
  'categories': true,
  'templatesDir': 'templates',
  'defaultPostTemplate': 'post',
  'dataDir': 'data'
};

var getTemplates = function (options) {
  var deferred = w.defer();

  // Load and pre-compile templates
  var templates = gulp.src([options.templatesDir + '/*', options.pagesDir + '/**/*'])
    // Filter out directories
    .pipe(es.map(function (tmp, cb) { tmp.isDirectory() ? cb() : cb(null, tmp); }))
    // Remove front matter not useful for templating
    .pipe(frontMatter({remove: true}))
    // Generate a master object of named templates
    .pipe(reduce(function (allTemplates, template) {
      var templateName = template.path.split('/').slice(-1)[0].replace(/\..+$/, '');
      var templateContent = template.contents;

      if (template.isDirectory()) {
        return allTemplates;
      } else {
        if (/\/pages\//.test(template.path)) {
          allTemplates['pages'][templateName] = _.template(templateContent.toString());
        } else {
          allTemplates[templateName] = _.template(templateContent.toString());
        }
      }

      return allTemplates;
    },
    {pages: {}}));

  // Once all templates are reduced to one object, resolve the promise
  templates.on('data', function (templates) { deferred.resolve(templates); });

  return deferred.promise;
};

var getData = function (options) {
  var deferred = w.defer();
  var dataTypes = {};

  try {
    dataTypes = fs.readdirSync(options.dataDir)
      .filter(function (file) {
        return fs.statSync(path.join(options.dataDir, file)).isDirectory();
      })
      .reduce(function (progress, type) {
        progress[type] = [];
        return progress;
      }, {});
  } catch (err) {
    deferred.reject(err);
  }

  gulp.src(path.join(options.dataDir, "**/*.md"))
    .pipe(frontMatter({ property: 'frontMatter', remove: true }))
    .pipe(markdown())
    .pipe(es.map(function (file) {
      var pathParts = file.path.split(path.sep);
      var dataType = pathParts[pathParts.length - 2];

      var entryData = file.frontMatter;
      entryData.content = file._contents.toString();
      dataTypes[dataType].push(entryData);

      return file;
    }));

  deferred.resolve(dataTypes);

  return deferred.promise;
};

transblogify.posts = function (options) {
  options = _.extend(defaults, options);
  mkdirp.sync(options.outputDir);

  var tmplPromise = getTemplates(options);
  tmplPromise.done(function (templates) {
      posts.getPosts(options)
      .pipe(posts.generateSlug())
      // Build post permalink folder
      .pipe(posts.buildPermalinks(options))
      // Build categories folders
      .pipe(posts.buildCategories(options))
      // Write the posts
      .pipe(markdown({
        highlight: function (code, lang, callback) {
          require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
            callback(err, result.toString());
          })
        }
      }))
      // Run post through its template
      .pipe(posts.templatize(templates))
      // Write posts
      .pipe(posts.write(options));
  });
};

transblogify.pages = function (options) {
  var site = {};

  if (fs.existsSync(path.join(process.cwd(), 'site.json'))) {
    site = require(path.join(process.cwd(), 'site.json')) || {};
  }

  options = _.extend(defaults, options);
  mkdirp.sync(options.outputDir);

  var tmplPromise = getTemplates(options);
  tmplPromise.done(function (templates) {
    // Load posts into memory before rendering pages
    posts.getPosts(options)
      .pipe(posts.generateSlug())
      .pipe(reduce(function (posts, post) { posts.push(post); return posts; }, []))
      .on('data', function (posts) {
        posts = _.sortBy(posts, function (post) { return post.frontMatter.date; }).reverse();
        gulp.src(path.join(options.pagesDir, '/**/*'))
          .pipe(pages.buildTree(options))
          .pipe(frontMatter({ property: 'frontMatter', remove: true }))
          .pipe(pages.buildPages(options, site, templates, posts));
      });
  });
};

module.exports = transblogify;
