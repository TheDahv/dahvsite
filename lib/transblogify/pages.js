const _ = require('underscore');
const es = require('event-stream');
const fs = require('fs');
const gulp = require('gulp');
const mkdirp = require('mkdirp');
const moment = require('moment');
const path = require('path');
const w = require('when');

const pages = {};

pages.buildTree = function (options) {
  return es.map((file, callback) => {
    if (file.isDirectory()) {
      // Skip folders and don't pass them on to the stream
      return callback();
    }

    // Prepare target dir
    const pathParts = file.relative.split('/');
    pathParts[pathParts.length - 1] = pathParts[pathParts.length - 1]
      .replace(/\..+$/, '');

    // Only build directories for pages that aren't the root index page
    if (file.relative !== 'index.html') {
      // mkdirp.sync(path.join.apply(null, [options.outputDir].concat(pathParts)));
      mkdirp.sync(path.join.call(null, options.outputDir, ...pathParts));
    }

    // Only send pages through to the stream
    callback(null, file);
  });
};

pages.buildPages = (options, site, templates, posts, data) => {
  return es.map((page, callback) => {
    let pageContent;
    if (page.frontMatter.template) {
      // First render the page with its own data
      const pageName = page
        .relative
        .split('/')
        .slice(-1)[0]
        .replace(/\..+$/, '');

      pageContent = templates.pages[pageName]({
        data,
        moment,
        posts,
        site,
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
    if (page.relative !== "index.html" && /html$/.test(page.path)) {
      // Update path to write to index.html within the relative folder
      const pathParts = page.relative.split('/');
      pathParts[pathParts.length - 1] =
        pathParts[pathParts.length - 1].replace(/\..+$/, '');
      pathParts.push('index.html');

      //fs.writeFileSync(path.join.apply(null, [options.outputDir].concat(pathParts)), pageContent);
      fs.writeFileSync(
        path.join.call(null, options.outputDir, ...pathParts),
        pageContent
      );
    } else {
      fs.writeFileSync(
        path.join(options.outputDir, page.relative),
        pageContent
      );
    }

    return callback();
  });
};

module.exports = pages;
