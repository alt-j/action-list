'use strict';

var gulp = require('gulp');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');

gulp.task('build', function () {
    gulp.src('./src/js/index.js')
        .pipe(jspm({
            minify: true,
            skipSourceMaps: true
        }))
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('./build'));
});
