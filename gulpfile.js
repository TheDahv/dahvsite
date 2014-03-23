var _ = require('underscore');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var transblogify = require('./lib/transblogify');
var clean  = require('gulp-clean');

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

gulp.task('default', function (cb) {
  runSequence('clean', 'posts', 'pages');
});
