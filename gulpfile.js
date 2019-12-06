const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pug = require('gulp-pug'); // Templating
const autoprefixer = require('gulp-autoprefixer'); // X-browser
const browserSync = require('browser-sync').create(); // Live reloading
const del = require('del'); // Delete files
const runSequence = require('run-sequence');
const cache = require('gulp-cache');
const cleanCSS = require('gulp-clean-css');


/*
 * TOP LEVEL FUNCTIONS
 * gulp.task - Define tasks
 * gulp.src - Point to files to use
 * gulp.dest - Points to folder to output
 * gulp.watch - Watch files and folders for changes
 * */

/**
 * Compiles all pug files
 */
gulp.task('pug', () => {
    gulp.src('src/index.pug')
        .pipe(pug())
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(gulp.dest((file) => {
            return file.base;
        }));
});

/**
 * Compiles main scss file into css
 * Applies Autoprefixer
 * Allows for hot reloading of styles
 */
gulp.task('sass', () => {
    gulp.src('src/css/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest((file) => {
            return file.base;
        }))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Initializes browserSync with the corresponding base directory
 */
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './src'
        },
    })
});

/**
 * Initializes browserSync
 * Does initial sass, pug compile
 * Watches all sass and pug
 */
gulp.task('watch', ['browserSync', 'sass', 'pug'], () => {
    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch(['**/*.pug', '!**/node_modules{,/**}'], ['pug', browserSync.reload]);
});


/* --------------------- Build ------------------------ */
gulp.task('build:clean', () => {
    return del.sync('dist');
});

gulp.task('build:html', () => {
    return gulp.src(['src/index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css', () => {
    return gulp.src(['src/css/styles.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', () => {
    return gulp.src(['src/js/script.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Optimize images
gulp.task('build:images', () => {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', () => {
    runSequence('build:clean', ['build:images', 'build:html', 'build:css', 'build:js']);
});

// // Copy all HTML files
// gulp.task('copyHTML', () => {
//     gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'))
// });
//
// // Optimize images
// gulp.task('imageMin', () => {
//     gulp.src('res/img/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'))
// });
//
// // Minify JS
// gulp.task('minify', () => {
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });
//
//
// gulp.task('default', () => {
//     return console.log('Gulp is running')
// });
gulp.task('default', ['message', 'minify']);
