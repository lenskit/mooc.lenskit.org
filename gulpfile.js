"use strict";
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const args = require('minimist')(process.argv.slice(2));

const outputDir = args['dest-dir'] || '_site';

gulp.task('manual', function() {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^build /));
  if (command === undefined) {
    return Promise.reject(new Error("cannot find gitbook 'build' command"));
  }
  return command.exec(['manual', path.join(outputDir, 'documentation')],
                      {log: 'info', format: 'website'});
});

gulp.task('manual:epub', function() {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^epub /));
  if (command === undefined) {
    return Promise.reject(new Error("cannot find gitbook 'epub' command"));
  }
  return command.exec(['manual'],
                      {log: 'info'});
});

gulp.task('manual:pdf', function() {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^pdf /));
  if (command === undefined) {
    return Promise.reject(new Error("cannot find gitbook 'pdf' command"));
  }
  return command.exec(['manual'],
                      {log: 'info'});
});


gulp.task('copy-docs', function() {
  const addFooter = require('./lib/addfooter');
  return gulp.src('static/**', {buffer: false})
             .pipe($.changed(outputDir))
             .pipe($.buffer())
             .pipe($.if('*.html', $.posthtml([
               addFooter('piwik.html')
             ])))
             .pipe(gulp.dest(outputDir));
});

gulp.task('pages', function() {
  const pages = require('./lib/pages');
  return pages.render('content', outputDir, 'layouts');
});

gulp.task('styles', function() {
  const gulpSass = require('gulp-sass');
  return gulp.src('styles/*.scss')
      .pipe(gulpSass())
      .pipe(gulp.dest(path.join(outputDir, 's')));
});

gulp.task('build', gulp.parallel('manual', 'copy-docs', 'pages', 'styles'));

gulp.task('default', gulp.series('build'));

gulp.task('serve', function() {
  var testServer = require('./lib/test-server');
  testServer(outputDir);
});
