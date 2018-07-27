const es   = require('event-stream');
const fs = require('fs');
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
const mkdirp = require('mkdirp');
const path = require('path');
const posts = require('./posts');
const reduce      = require('stream-reduce');

module.exports = options => {
  const { redirectsDir } = options || {};
  const generateSlug = posts.generateSlug();

  return gulp
    .src([ 'pages/**/*', 'posts/**/*' ], { read: true, } )
    .pipe(es.map((file, callback) => {
      callback(null, file.isDirectory() ? undefined : file);
    }))
    .pipe(frontMatter({ property: 'frontMatter', remove: true }))
    .pipe(posts.generateSlug())
    .pipe(es.map((file, callback) => {
      const { cwd, base, path, slug } = file;
      const type = base.replace(/\/$/, '').split('/').pop();
      const page = slug
        ? slug
        : path
            .replace(cwd, '')
            .split('/')
            .slice(2)
            .join('/')
            .replace(/(\.html|\.md)$/, '');

      const entry = type === 'posts' ?
        [ 'blog', page ].join('/')
          : page === 'index' ?
            undefined
            : page

      callback(null, entry);
    }))
};
