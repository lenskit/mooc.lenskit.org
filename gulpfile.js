"use strict";
const gulp = require('gulp');
const g = {
  changed: require('gulp-changed')
};

const outputDir = '_site';

gulp.task('manual', function(callback) {
  const gitbook = require('gitbook');
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^build /));
  if (command === undefined) {
    return callback(new Error("cannot find gitbook 'build' command"))
  }
  return command.exec([__dirname, 'documentation'],
                      {log: 'info', format: 'website'});
});

gulp.task('copy-docs', function() {
  return gulp.src('static/**', {buffer: false})
             .pipe(g.changed(outputDir))
             .pipe(gulp.dest(outputDir));
})
