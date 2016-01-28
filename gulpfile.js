var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');

var app = 'app/app.js';

gulp.task('default', function() {
  nodemon({
    script: app,
  }).on('start');
});
