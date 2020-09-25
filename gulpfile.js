var gulp = require('gulp'),
  connect = require('gulp-connect'),
  gulpSass = require('gulp-sass'),
  gulpAutoprefixer = require('gulp-autoprefixer'),
  extender = require('gulp-html-extend'),
  pxtoviewport = require('postcss-px-to-viewport'),
  postcss = require('gulp-postcss');

gulp.task('connect-web', async function () {
  return connect.server({
    root: './src/web',
    livereload: true,
    port: 8081
  });
});

gulp.task('html-web', async function () {
  return gulp.src('./src/web/*.html')
    .pipe(extender({ annotations: true, verbose: false }))
    .pipe(gulp.dest('./src/web/dist/html'))
    .pipe(connect.reload());
});

gulp.task('sass-web', async function () {
  return gulp.src('./src/web/scss/*.scss')
    .pipe(gulpSass())
    .pipe(gulpAutoprefixer())
    .pipe(gulp.dest('./src/web/dist'))
    .pipe(connect.reload())
});

gulp.task('image-web', async function () {
  return gulp.src('./src/web/image/*')
    .pipe(gulp.dest('./src/web/dist/image'))
    .pipe(connect.reload())
});

gulp.task('font-web', async function () {
  return gulp.src('./src/web/font/*')
    .pipe(gulp.dest('./src/web/dist/font'))
    .pipe(connect.reload())
});

gulp.task('js-web', async function () {
  return gulp.src('./src/web/js/*')
    .pipe(gulp.dest('./src/web/dist/js'))
    .pipe(connect.reload())
});

gulp.task('watch-web', async function () {
  gulp.watch(['./src/web/*.html'], gulp.series('html-web'));
  gulp.watch(['./src/web/scss/*.scss'], gulp.series('sass-web'));
  gulp.watch(['./src/web/image/*'], gulp.series('image-web'));
  gulp.watch(['./src/web/font/*'], gulp.series('font-web'));
  gulp.watch(['./src/web/js/*'], gulp.series('js-web'));
});

gulp.task('web', gulp.series('connect-web', 'html-web', 'sass-web', 'image-web', 'font-web', 'js-web', 'watch-web'));

gulp.task('connect-h5', async function () {
  return connect.server({
    root: './src/h5',
    livereload: true,
    port: 8080
  });
});

gulp.task('html-h5', async function () {
  return gulp.src('./src/h5/*.html')
    .pipe(extender({ annotations: true, verbose: false }))
    .pipe(gulp.dest('./src/h5/dist/html'))
    .pipe(connect.reload());
});

gulp.task('sass-h5', async function () {
  var processors = [
    pxtoviewport({
        viewportWidth: 350
    })
];

  return gulp.src('./src/h5/scss/*.scss')
    .pipe(gulpSass())
    .pipe(postcss(processors))
    .pipe(gulpAutoprefixer())
    .pipe(gulp.dest('./src/h5/dist'))
    .pipe(connect.reload())
});

gulp.task('image-h5', async function () {
  return gulp.src('./src/h5/image/*')
    .pipe(gulp.dest('./src/h5/dist/image'))
    .pipe(connect.reload())
});


gulp.task('watch-h5', async function () {
  gulp.watch(['./src/h5/*.html'], gulp.series('html-h5'));
  gulp.watch(['./src/h5/scss/*.scss'], gulp.series('sass-h5'));
  gulp.watch(['./src/h5/image/*'], gulp.series('image-h5'));
});

gulp.task('h5', gulp.series('connect-h5', 'html-h5', 'sass-h5', 'image-h5', 'watch-h5'));