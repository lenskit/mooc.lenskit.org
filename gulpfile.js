"use strict";
const gulp = require('gulp');

gulp.task('manual', function(callback) {
  const gitbook = require('gitbook');
  gitbook.commands.forEach((cmd) => console.log(cmd.name))
  let command = gitbook.commands.find((cmd) => cmd.name.match(/^build /));
  if (command === undefined) {
    return callback(new Error("cannot find gitbook 'build' command"))
  }
  return command.exec([__dirname, 'documentation'],
                      {log: 'info', format: 'website'})
});
