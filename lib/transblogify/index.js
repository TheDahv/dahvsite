const _           = require('underscore');
const es          = require('event-stream');
const frontMatter = require('gulp-front-matter');
const fs          = require('fs');
const gulp        = require('gulp');
const markdown    = require('gulp-markdown');
const mkdirp      = require('mkdirp');
const pages       = require('./pages');
const path        = require('path');
const posts       = require('./posts');
const reduce      = require('stream-reduce');
const sitemap     = require('./sitemap');
const w           = require('when');

const transblogify = {};

const defaults = {
  'postsDir': 'posts',
  'postsPattern': '*.md',
  'pagesDir': 'pages',
  'outputDir': 'build',
  'categories': true,
  'templatesDir': 'templates',
  'defaultPostTemplate': 'post',
  'dataDir': 'data',
  'siteRoot': ''
};

function getTemplates(options) {
  const deferred = w.defer();

  // Load and pre-compile templates
  const templateStream = gulp
    .src([ `${options.templatesDir}/*`, `${options.pagesDir}/**/*` ])
    // Filter out directories
    .pipe(es.map((tmp, cb) => tmp.isDirectory() ? cb() : cb(null, tmp)))
    // Remove front matter not useful for templating
    .pipe(frontMatter({remove: true}))
    // Generate a master object of named templates
    .pipe(reduce(
      (allTemplates, template) => {
        const templateName = template
          .path
          .split('/')
          .slice(-1)[0]
          .replace(/\..+$/, '');

        var templateContent = template.contents;

        if (template.isDirectory()) {
          return allTemplates;
        }

        const compiled = {
          [templateName]: _.template(templateContent.toString())
        };
        if (/\/pages\//.test(template.path)) {
          Object.assign(allTemplates.pages, compiled);
          return allTemplates;
        }
        return Object.assign(allTemplates, compiled);
      },
      { pages: {} }
    ));

  // Once all templates are reduced to one object, resolve the promise
  templateStream.on('data', deferred.resolve);
  return deferred.promise;
};

function getData(options) {
  const deferred = w.defer();

  let dataTypes;
  try {
    dataTypes = fs.readdirSync(options.dataDir)
      .filter(file => {
        return fs.statSync(path.join(options.dataDir, file)).isDirectory();
      })
      .reduce(
        (progress, type) => Object.assign(progress, { [type]: [] }),
        {}
      );
  } catch (err) {
    deferred.reject(err);
  }

  gulp.src(path.join(options.dataDir, '**/*.md'))
    .pipe(frontMatter({ property: 'frontMatter', remove: true }))
    .pipe(markdown())
    .pipe(es.map(file => {
      const pathParts = file.path.split(path.sep);
      const dataType = pathParts[pathParts.length - 2];

      const entryData = file.frontMatter;
      entryData.content = file._contents.toString();
      dataTypes[dataType].push(
        Object.assign(
          {},
          file.frontMatter,
          { content: file._contents.toString() }
        )
      );

      return file;
    }));

  deferred.resolve(dataTypes);

  return deferred.promise;
};

transblogify.posts = options => {
  options = _.extend(defaults, options);
  mkdirp.sync(options.outputDir);

  const tmplPromise = getTemplates(options);
  tmplPromise.done(templates => {
      posts
        .getPosts(options)
        .pipe(posts.generateSlug())
        // Build post permalink folder
        .pipe(posts.buildPermalinks(options))
        // Build categories folders
        .pipe(posts.buildCategories(options))
        // Write the posts
        .pipe(markdown({
          highlight: (code, lang, callback) => {
            require('pygmentize-bundled')(
              { lang: lang, format: 'html' },
              code,
              (err, result) => {
                callback(err, result.toString());
              }
            );
          }
        }))
        // Run post through its template
        .pipe(posts.templatize(templates))
        // Write posts
        .pipe(posts.write(options));
  });
};

transblogify.pages = options => {
  const siteConfig = {};

  const siteConfigPath = path.join(process.cwd(), 'site.json');
  if (fs.existsSync(siteConfigPath)) {
    siteConfig = require(siteConfigPath) || {};
  }

  options = _.extend(defaults, options);
  mkdirp.sync(options.outputDir);

  const tmplPromise = getTemplates(options);
  const dataPromise = getData(options);

  w.all([tmplPromise, dataPromise])
    .done(
      ([ templates, data ] = []) => {
        // Load posts into memory before rendering pages
        posts.getPosts(options)
          .pipe(posts.generateSlug())
          .pipe(reduce((posts, post) => { posts.push(post); return posts; }, []))
          .on('data', posts => {
            posts = _.sortBy(posts, post => post.frontMatter.date).reverse();
            gulp.src(path.join(options.pagesDir, '/**/*'))
              .pipe(pages.buildTree(options))
              .pipe(frontMatter({ property: 'frontMatter', remove: true }))
              .pipe(pages.buildPages(
                options,
                siteConfig,
                templates,
                posts,
                data
              ));
          });
      },
      err => console.error(err)
    );
};

transblogify.sitemap = options => {
  options = _.extend(defaults, options);
  return sitemap(options);
}

module.exports = transblogify;
