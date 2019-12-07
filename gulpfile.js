const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer'); // X-browser
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create(); // Live reloading
const del = require('del'); // Delete files
const cache = require('gulp-cache');
const cleanCSS = require('gulp-clean-css');


/* --------------------- Helpers ------------------------ */
const initializeBrowserSync = (type) => {
    return browserSync.init({
        server: {
            baseDir: type === 'build' ? './dist' : './src'
        },
    })
}

/**
 * Compiles all pug files
 */

gulp.task('pug', () => {
     return gulp.src('src/index.pug')
        .pipe(pug({
            pretty: true
        }))
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
    return gulp.src('src/css/styles.scss')
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
gulp.task('browserSync', initializeBrowserSync);

/**
 * Initializes browserSync
 * Does initial sass, pug compile
 * Watches all sass and pug
 */
gulp.task('watch', gulp.series('browserSync', 'sass', 'pug', () => {
    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch(['**/*.pug', '!**/node_modules{,/**}'], ['pug', browserSync.reload]);
}));


/* --------------------- Build ------------------------ */
gulp.task('build:clean', (done) => {
    del.sync('dist');
    done();
});

gulp.task('build:copy-files', () => {
    const filesToCopy = [
        'src/*.0/**/*',
        'favicon.ico',
        'resume.pdf',
        'humans.txt'
    ];
    return gulp.src(filesToCopy)
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', gulp.series('pug', () => {
    return gulp.src(['src/index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(replace('./css/styles.css', './styles.css'))
        .pipe(replace('./js/script.js', './script.js'))
        .pipe(gulp.dest('dist'));
}));

gulp.task('build:css', gulp.series('sass', () => {
    return gulp.src(['src/css/styles.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
}));

gulp.task('build:js', () => {
    return gulp.src(['src/js/script.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('build:images', () => {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.series('build:clean', gulp.parallel('build:copy-files', 'build:images', 'build:html', 'build:css', 'build:js' )));

gulp.task('serve:build', gulp.series('build', () => {
    return initializeBrowserSync('build');
}));
