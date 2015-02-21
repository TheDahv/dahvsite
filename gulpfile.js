var _            = require('underscore');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var awspublish   = require('gulp-awspublish');
var sass         = require('gulp-sass');
var transblogify = require('./lib/transblogify');
var clean        = require('gulp-clean');
var mkdirp       = require('mkdirp');
var path         = require('path');

// Live Reload
// http://rhumaric.com/2014/01/livereload-magic-gulp-style/
var express = require('express');
var app;

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/build';
var LIVERELOAD_PORT = 35729;

var startExpress = function () {
  if (!app) {
    app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);
  }
};

var lr;
var startLiveReload = function () {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
};

var notifyLivereload = function (event) {
  if (event) {
    console.log(event);
    gulp.src(event.path, {read: false})
      .pipe(require('gulp-livereload')(lr));
  }
  //var fileName = require('path').relative(EXPRESS_ROOT, event.path);

  //lr.changed({ body: { files: [fileName] } });
};

// Generate pygments stylesheets:
// http://funcptr.net/2011/11/27/generating-stylesheets-for-pygments/
// https://github.com/chjj/marked

gulp.task('clean', function () {
  console.log("Cleaning...");
  return gulp.src('build/**/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('posts', function () {
  return transblogify.posts({
    'postsDir': 'posts',
    'postsPattern': '*.md',
    'outputDir': 'build',
    'categories': true,
    'templatesDir': 'templates',
    'defaultPostTemplate': 'post'
  });
});

gulp.task('pages', function () {
  return transblogify.pages({
    'templatesDir': 'templates',
    'pagesDir': 'pages',
    'outputDir': 'build'
  });
});

gulp.task('sass', function () {
  mkdirp.sync('./build/css');

  return gulp.src('./assets/sass/application.scss')
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'map'
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watchsrc', function () {
  gulp.watch(['assets/sass/*/**.scss'], ['sass']);
  gulp.watch(['posts/**/*', 'pages/**/*', 'templates/**/*'], ['build']);
});

gulp.task('move-assets', function (cb) {
  mkdirp.sync('build/images');
  mkdirp.sync('build/js');

  gulp.src('assets/js/*')
    .pipe(gulp.dest('build/js'));

  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('build', function () {
  runSequence('clean', 'posts', 'pages', 'sass', 'move-assets');
});

gulp.task('autoserve', ['build', 'watchsrc'], function () {
  startExpress();
  startLiveReload();

  // Wait 2 seconds before watching for live reload
  setTimeout(function () {
    gulp.watch(['build/**/*'], function (changeEvent) {
      var changedFile = path.relative(EXPRESS_ROOT, changeEvent.path);
      lr.changed({ body: { files: [changedFile] } });
    });
  }, 2000);
});

gulp.task('publish', function () {
  var publisher = awspublish.create(require('./awscredentials.json'));

  return gulp.src('build/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

gulp.task('default', ['build']);
