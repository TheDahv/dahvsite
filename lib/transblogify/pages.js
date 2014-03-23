var gulp = require('gulp');
var fs = require('fs');
var es = require('event-stream');
var _ = require('underscore');
var w = require('when');
var path = require('path');
var mkdirp = require('mkdirp');

var pages = {};

pages.buildTree = function (options) {
  return es.map(function (file, cb) {
    var pagePath, pathParts;

    if (file.isDirectory()) {
      // Skip folders and don't pass them on to the stream
      cb();
    } else {
      // Prepare target dir
      pathParts = file.relative.split('/');
      pathParts[pathParts.length - 1] = pathParts[pathParts.length - 1].replace(/\..+$/, '');

      // Only build directories for pages that aren't the
      // root index page
      if (file.relative !== 'index.html') {
        mkdirp.sync(path.join.apply(null, [options.outputDir].concat(pathParts)));
      }

      // Only send pages through to the stream
      cb(null, file);
    }
  });
};

pages.buildPages = function (options, site, templates, posts) {
  return es.map(function (page, cb) {
    var pageContent, pathParts;

    if (page.frontMatter.template) {
      // First render the page with its own data
      pageContent = templates['pages'][page.relative.split('/').slice(-1)[0].replace(/\..+$/, '')]({
        site: site,
        posts: posts
      });

      // Then render it into its template
      pageContent = templates[page.frontMatter.template]({
        contents: pageContent
      });
    } else {
      pageContent = page.contents;
    }

    // Move HTML pages behind their own folders for permalinking
    // Non-HTML files (e.g., PDFs) or the index file are written as is
    if (page.relative !== "index.html" && /\.+\.html/.test(page.path)) {
      // Update path to write to index.html within the relative folder

      pathParts = page.relative.split('/');
      pathParts[pathParts.length - 1] = pathParts[pathsParts.length - 1].replace(/\..+$/, '');
      pathParts.push('index.html');

      fs.writeFileSync(path.join.apply(null, [options.outputDir].concat(pathParts)), pageContent);
    } else {
      fs.writeFileSync(path.join(options.outputDir, page.relative), pageContent);
    }
  });
};

module.exports = pages;
