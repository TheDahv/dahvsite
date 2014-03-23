var _            = require('underscore');
var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var transblogify = require('./lib/transblogify');
var clean        = require('gulp-clean');
var mkdirp       = require('mkdirp');

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
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
  gulp.watch(['assets/sass/*.scss'], ['sass']);
  gulp.watch(['posts/**/*', 'pages/**/*', 'templates/*'], ['build']);
});

gulp.task('build', function () {
  runSequence('clean', 'posts', 'pages', 'sass');
});

gulp.task('default', ['build', 'watch']);
