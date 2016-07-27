"use strict";
const path = require('path');
const gulp = require('gulp');
const g = {
  util: require('gulp-util'),
  changed: require('gulp-changed')
};

const outputDir = g.util.env['dest-dir'] || '_site';

gulp.task('manual', function(callback) {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^build /));
  if (command === undefined) {
    return callback(new Error("cannot find gitbook 'build' command"))
  }
  return command.exec(['manual', path.join(outputDir, 'documentation')],
                      {log: 'info', format: 'website'});
});

gulp.task('copy-docs', function() {
  return gulp.src('static/**', {buffer: false})
             .pipe(g.changed(outputDir))
             .pipe(gulp.dest(outputDir));
})

gulp.task('pages', function() {
  const pages = require('./lib/pages');
  return pages.render('content', outputDir, 'layouts')
});
