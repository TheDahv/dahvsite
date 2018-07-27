const _            = require('underscore');
const awspublish   = require('gulp-awspublish');
const del          = require('del');
const es           = require('event-stream');
const gulp         = require('gulp');
const mkdirp       = require('mkdirp');
const path         = require('path');
const runSequence  = require('run-sequence');
const sass         = require('gulp-sass');
const transblogify = require('./lib/transblogify');

// Live Reload
// http://rhumaric.com/2014/01/livereload-magic-gulp-style/
const express = require('express');
let app;

const EXPRESS_PORT = 4000;
const EXPRESS_ROOT = __dirname + '/build';
const LIVERELOAD_PORT = 35729;
const SITE_ROOT = 'http://www.thedahv.com';

function startExpress() {
  if (!app) {
    app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);
  }
}

let lr = null;
function startLiveReload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {
  if (event) {
    console.log(event);
    gulp.src(event.path, {read: false})
      .pipe(require('gulp-livereload')(lr));
  }
  //var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  //lr.changed({ body: { files: [fileName] } });
}

// Generate pygments stylesheets:
// http://funcptr.net/2011/11/27/generating-stylesheets-for-pygments/
// https://github.com/chjj/marked

gulp.task('clean',
  del.bind(del, [
    'build/**/*',
    '!build/about',
    '!build/about/davidpierce-resume.pdf'
  ]
));

gulp.task('posts', () => {
  return transblogify.posts({
    'postsDir': 'posts',
    'postsPattern': '*.md',
    'outputDir': 'build',
    'categories': true,
    'templatesDir': 'templates',
    'defaultPostTemplate': 'post'
  });
});

gulp.task('pages', () => {
  return transblogify.pages({
    'templatesDir': 'templates',
    'pagesDir': 'pages',
    'outputDir': 'build'
  });
});

gulp.task('sass', () => {
  mkdirp.sync('./build/css');

  return gulp.src('./assets/sass/application.scss')
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'map',
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watchsrc', () => {
  gulp.watch([ 'assets/sass/*/**.scss' ], [ 'sass' ]);
  gulp.watch(
    [
      'posts/**/*',
      'pages/**/*',
      'templates/**/*',
      'data/**/*'
    ],
    ['build']
  );
});

gulp.task('move-assets', () => {
  mkdirp.sync('build/images');
  mkdirp.sync('build/js');

  gulp.src('assets/js/*')
    .pipe(gulp.dest('build/js'));

  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('create-sitemap', () => {
  return transblogify.sitemap({ siteRoot: SITE_ROOT });
});

gulp.task('redirects', () => {
  const {client} = awspublish.create(require('./awscredentials.json'));
  return transblogify.redirects()
    .pipe(es.map((Key, callback) => {
      console.log(Key);
      client.putObject({
        ACL: 'public-read',
        Key,
        WebsiteRedirectLocation: `https://www.thedahv.com/${Key}/`
      }, callback);
    }))
  .pipe(awspublish.reporter());
});

gulp.task('build', () => {
  runSequence(
    'clean',
    'pages',
    'posts',
    'sass',
    'move-assets',
    'create-sitemap'
  );
});

gulp.task('autoserve', ['build', 'watchsrc'], () => {
  startExpress();
  startLiveReload();

  // Wait 2 seconds before watching for live reload
  setTimeout(function () {
    gulp.watch(['build/**/*'], function (changeEvent) {
      let changedFile = path.relative(EXPRESS_ROOT, changeEvent.path);
      lr.changed({ body: { files: [changedFile] } });
    });
  }, 2000);
});

gulp.task('publish', () => {
  const publisher = awspublish.create(require('./awscredentials.json'));

  return gulp.src('build/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

gulp.task('default', ['build']);
