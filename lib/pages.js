const gulp = require('gulp');
const path = require('path');
const extend = require('extend');
const layout = require('gulp-layout');
const grayMatter = require('gulp-gray-matter');
const through = require('through2');
const markdown = require('gulp-markdown');

function siteLayout(layoutDir) {
  return layout(function(file) {
    var defaults = {
      layout: `${layoutDir}/default.html`,
      engine: 'handlebars'
    };
    return extend(defaults, file.data);
  });
}

function render(cdir, ddir, ldir) {
  return gulp.src([cdir + '/*.md'])
            .pipe(grayMatter())
            .pipe(markdown())
            .pipe(siteLayout(ldir))
            .pipe(gulp.dest(ddir));
}

module.exports = {
  render: render
}
