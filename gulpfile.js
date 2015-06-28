'use strict';

const gulp   = require('gulp');
const jade   = require('gulp-jade');
const rename = require('gulp-rename');

gulp.task('default', function() {

  const opts = {
    pretty: true,
    locals: {
      mode: "compilation"
    }
  };

  const renamer = function (path) {
    path.basename = path.basename.replace('page_','');
    return path;
  };

  gulp
    .src('./views/page_*.jade')
    .pipe(rename(renamer))
    .pipe(jade(opts))
    .pipe(gulp.dest('./public/'));
  
});
