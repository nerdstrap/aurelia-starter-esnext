var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');

var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
var htmlmin = require('gulp-htmlmin');


// transpiles script file to SystemJS format
// plumber prevents 'pipe breaking'
gulp.task('build-system', function () {
    return gulp.src(paths.source)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, compilerOptions.system())))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
        .pipe(gulp.dest(paths.output));
});

// compiles html files to minified html
gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.output));
});

// compiles scss files to css
gulp.task('build-css', function () {
    return sass(paths.styles, {
        loadPath: paths.scssPaths,
        sourcemap: true,
        lineNumber: true
    })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9'],
            cascade: false
        }))
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: '.'
        }))
        .pipe(gulp.dest(paths.output + '/styles'));
});

// builds fonts
gulp.task('build-fonts', function () {
   return gulp.src(paths.fontPaths)
       .pipe(gulp.dest(paths.output + '/fonts'));
});

// builds images
gulp.task('build-images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.output + '/images'));
});

// runs ./gulp/tasks/clean first, then build system/html/css in parallel
gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html', 'build-css', 'build-fonts', 'build-images'],
        callback
    );
});
