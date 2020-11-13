var gulp = require('gulp'),
  gulpSass = require('gulp-sass'),
  gulpAutoprefixer = require('gulp-autoprefixer'),
  extender = require('gulp-html-extend'),
  pxtoviewport = require('postcss-px-to-viewport'),
  postcss = require('gulp-postcss'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  gulpServer = require('gulp-webserver');

  gulp.task('connect-web', async function () {
    return gulp.src('./src/web/dist/').pipe(
      gulpServer({
        port: 8089,//端口号
        host: "127.0.0.1",//主机名
        livereload: true,//是否热更新
        open: '/html/index.html',//是否打开浏览器
    })
    )
  });

gulp.task('html-web', async function () {
  return gulp.src('./src/web/*.html')
    .pipe(extender({ annotations: true, verbose: false }))
    .pipe(gulp.dest('./src/web/dist/html'))
});

gulp.task('sass-web', async function () {
  return gulp.src('./src/web/scss/*.scss')
    .pipe(gulpSass())
    .pipe(gulpAutoprefixer())
    .pipe(gulp.dest('./src/web/dist/css'))
});

gulp.task('image-web', async function () {
  return gulp.src('./src/web/image/*')
    .pipe(gulp.dest('./src/web/dist/image'))
});

gulp.task('font-web', async function () {
  return gulp.src('./src/web/font/*')
    .pipe(gulp.dest('./src/web/dist/font'))
});

gulp.task('js-web', async function () {
  return gulp.src('./src/web/js/*')
    .pipe(gulp.dest('./src/web/dist/js'))
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
  return gulp.src('./src/h5/dist/').pipe(
    gulpServer({
      port: 8088,//端口号
      host: "127.0.0.1",//主机名
      livereload: true,//是否热更新
      open: '/html/index.html',//是否打开浏览器
  })
  )
});

gulp.task('html-h5', async function () {
  return gulp.src(['./src/h5/*.json', './src/h5/*.html'])
    .pipe(extender({ annotations: true, verbose: false }))
    // .pipe(revCollector({
    //   replaceReved: true
    // }))
    .pipe(gulp.dest('./src/h5/dist/html'))
});

gulp.task('sass-h5', async function () {
  var processors = [
    pxtoviewport({
        viewportWidth: 750
    })
];

  return gulp.src('./src/h5/scss/*.scss')
    .pipe(gulpSass())
    .pipe(postcss(processors))
    .pipe(gulpAutoprefixer())
    // .pipe(rev())
    .pipe(gulp.dest('./src/h5/dist/css'))
    // .pipe(rev.manifest())
    // .pipe(gulp.dest('./src/h5/'))
});

gulp.task('image-h5', async function () {
  return gulp.src('./src/h5/image/*')
    .pipe(gulp.dest('./src/h5/dist/image'))
});


gulp.task('watch-h5', async function () {
  gulp.watch(['./src/h5/*.html'], gulp.series('html-h5'));
  gulp.watch(['./src/h5/scss/*.scss'], gulp.series('sass-h5'));
  gulp.watch(['./src/h5/image/*'], gulp.series('image-h5'));
});

gulp.task('h5', gulp.series('connect-h5', 'html-h5', 'sass-h5', 'image-h5', 'watch-h5'));