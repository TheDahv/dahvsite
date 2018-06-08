const es   = require('event-stream');
const fs = require('fs');
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
const posts = require('./posts');
const reduce      = require('stream-reduce');

module.exports = options => {
  const { postsDir, pagesDir, siteRoot, outputDir } = options || {};
  let generateSlug = posts.generateSlug();

  gulp
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
        [ siteRoot, 'blog', page, '' ].join('/')
          : page === 'index' ?
            siteRoot
            : `${siteRoot}/${page}/`

      callback(null, entry);
    }))
    .pipe(
      reduce((buffer, entry) => {
        return buffer += `
  <url>
    <loc>${entry}</loc>
  </url>`
      },
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
      )
    ).on('data', buffer => {
      buffer += '\n</urlset>';
      fs.writeFileSync(`${outputDir}/sitemap.xml`, buffer);
    });
};
