'use strict';

// npm init to create package.json file
// don't forget to install gulp as a dev dependency for this project, and also globally

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  del = require('del'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  fileinclude = require('gulp-file-include'),
  plumber = require('gulp-plumber');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    //.pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task("concatHtml", function () {
  gulp.src('./html/main/**/*.html')
    .pipe(fileinclude())
    //.pipe(concat("index.html"))
    .pipe(gulp.dest("public"))
    .pipe(livereload());
});

/* gulp.task("concatGroups", function () {
  gulp.src(['html/main/groups.html'])
    .pipe(fileinclude())
    //.pipe(concat("index.html"))
    .pipe(gulp.dest("public"))
    .pipe(livereload());
}); */

gulp.task('embedSvgs', () =>
  gulp.src('public/**/*.html')
    .pipe(embedSvg())
    .pipe(gulp.dest('public/')));


gulp.task('clean', function () {
  del(['public'])
});

gulp.task("watch", function () {
  livereload.listen();
  return gulp.watch(['html/**/*.html','html/**/*.json', 'sass/**/*.scss', 'img/*', 'js/*'], ['build'])

})

gulp.task("build", ['sass', 'concatHtml'], function () {
  return gulp.src(["css/*", "img/*", "js/*"], {
      base: './'
    })
    .pipe(gulp.dest('public'))
    .pipe(livereload());

});


gulp.task("default", ["watch"]);