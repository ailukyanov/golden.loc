'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

// Общий конфиг сборщика
const config = {
    proxy: {
        host: 'golden.loc',
        port: 4000
    },
    watch: {
        path: {
            html: "**/*.html",
            scss: "./scss/**/*.scss"
        }
    },
    sass: {
        src: './scss/**/*.scss',
        dest: './css',
    }
};

gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                overrideBrowserslist: "last 100 versions"
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream());

});

// Starts a BrowerSync instance
gulp.task('default', gulp.series('sass', function(){
    browserSync.init({
        proxy: config.proxy.host,
        port: config.proxy.port
    });

    gulp.watch(config.watch.path.html).on("change", browserSync.reload);
    gulp.watch(config.watch.path.scss, gulp.series('sass'));
}));
