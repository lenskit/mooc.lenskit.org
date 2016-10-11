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
    return callback(new Error("cannot find gitbook 'build' command"));
  }
  return command.exec(['manual', path.join(outputDir, 'documentation')],
                      {log: 'info', format: 'website'});
});

gulp.task('manual:epub', function(callback) {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^epub /));
  if (command === undefined) {
    return callback(new Error("cannot find gitbook 'epub' command"));
  }
  return command.exec(['manual'],
                      {log: 'info'});
});

gulp.task('manual:pdf', function(callback) {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^pdf /));
  if (command === undefined) {
    return callback(new Error("cannot find gitbook 'pdf' command"));
  }
  return command.exec(['manual'],
                      {log: 'info'});
});


gulp.task('copy-docs', function() {
  return gulp.src('static/**', {buffer: false})
             .pipe(g.changed(outputDir))
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

gulp.task('acme', function(callback) {
  const acme = require('acme-response');
  acme.fromFile('acme.yaml', outputDir, callback);
});

gulp.task('build', ['manual', 'copy-docs', 'pages', 'styles', 'acme']);

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  gulp.watch('styles/*.scss', ['styles']);
  gulp.watch('static/**', ['copy-docs']);
  gulp.watch(['content/**', 'layouts/*'], ['pages']);
  gulp.watch(['manual/**'], ['manual']);
});

gulp.task('serve', function() {
  var testServer = require('./lib/test-server');
  testServer(outputDir);
});
