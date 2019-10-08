'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                overrideBrowserslist: "last 100 versions"
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());

});

// Starts a BrowerSync instance
gulp.task('default', gulp.series('sass', function(){
    browserSync.init({
        server: ".",
        port: 4000
    });

    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
}));
