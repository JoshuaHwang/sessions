var gulp    = require('gulp');
var jade    = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var concat  = require('gulp-concat');

var app = 'app/app.js';

gulp.task('nodemon', function() {
  nodemon({
    script: app,
  }).on('start');
});

gulp.task('jade', function() {
  console.log('Running jade...');
  gulp.src('./template/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./app/views'))
});

gulp.task('angular', function() {
  console.log('Concat angular files..');
  gulp.src(
    [
      './app/public/js/**/module.js',
      './app/public/js/controllers/**/*.js',
      './app/public/js/directives/**/*.js',
      './app/public/js/services/**/*.js'
    ]
  ).pipe(concat('all.js'))
   .pipe(gulp.dest('./app/public'));
});

gulp.task('watch', ['jade', 'angular'], function () {
  gulp.watch('./template/**/*.jade', ['jade']);
  gulp.watch('./app/public/js/**/*.js', ['angular']);
});

gulp.task('default', ['jade', 'angular', 'watch', 'nodemon']);