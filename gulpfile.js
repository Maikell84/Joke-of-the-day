/* global require, __dirname, Server */

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var Server = require('karma').Server;

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('sass', function () {
  gulp.src([
    './src/stylesheets/index.scss'], { base: '.' })
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./www/css'));
});

gulp.task('javascript', function () {
  gulp.src([
    './src/javascripts/index.js',
    './src/javascripts/api.js',
    './src/javascripts/settings.js',
    './src/javascripts/storage.js'
  ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('copylib', function () {
  gulp.src([
    './node_modules/bootstrap-material-design/dist/js/material.min.js',
    './node_modules/bootstrap-material-design/dist/js/material.min.js.map',
    './node_modules/bootstrap-material-design/dist/js/ripples.min.js',
    './node_modules/bootstrap-material-design/dist/js/ripples.min.js.map',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js'
  ])
    .pipe(gulp.dest('./www/lib/js/'));

  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
    './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css.map',
    './node_modules/bootstrap-material-design/dist/css/ripples.min.css',
    './node_modules/bootstrap-material-design/dist/css/ripples.min.css.map'
  ])
    .pipe(gulp.dest('./www/lib/css/'));

  gulp.src([
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot',
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',
    './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
    './node_modules/material-design-icons/iconfont/material-icons.css'
  ])
    .pipe(gulp.dest('./www/fonts/'));
});

gulp.task('run', ['sass', 'javascript', 'copylib', 'test']);
