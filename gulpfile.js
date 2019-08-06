var gulp = require('gulp'),
  connect = require('gulp-connect'),
  gulpSass = require('gulp-sass'),
  gulpAutoprefixer = require('gulp-autoprefixer'),
  extender = require('gulp-html-extend');
 
gulp.task('connect-web', function() {
  connect.server({
    root: './src/web',
    livereload: true,
    port: 8081
  });
});
 
gulp.task('html-web', function () {
  gulp.src('./src/web/*.html')
    .pipe(extender({annotations:true,verbose:false}))
    .pipe(gulp.dest('./src/web/dist/html'))
    .pipe(connect.reload());
});

gulp.task('sass-web', function () {
    gulp.src('./src/web/scss/*.scss')
      .pipe(gulpSass())
      .pipe(gulpAutoprefixer())
      .pipe(gulp.dest('./src/web/dist'))
      .pipe(connect.reload())
  });

gulp.task('image-web', function () {
  gulp.src('./src/web/image/*')
    .pipe(gulp.dest('./src/web/dist/image'))
    .pipe(connect.reload())
});

gulp.task('font-web', function () {
  gulp.src('./src/web/font/*')
    .pipe(gulp.dest('./src/web/dist/font'))
    .pipe(connect.reload())
});

gulp.task('js-web', function () {
  gulp.src('./src/web/js/*')
    .pipe(gulp.dest('./src/web/dist/js'))
    .pipe(connect.reload())
});

gulp.task('watch-web', function () {
  gulp.watch(['./src/web/*.html'], ['html-web']);
  gulp.watch(['./src/web/scss/*.scss'], ['sass-web']);
  gulp.watch(['./src/web/image/*'], ['image-web']);
  gulp.watch(['./src/web/font/*'], ['font-web']);
  gulp.watch(['./src/web/js/*'], ['js-web']);
});
 
gulp.task('web', ['connect-web', 'html-web', 'sass-web', 'image-web', 'font-web', 'js-web', 'watch-web']);

gulp.task('connect-h5', function() {
  connect.server({
    root: './src/h5',
    livereload: true,
    port: 8080
  });
});
 
gulp.task('html-h5', function () {
  gulp.src('./src/h5/*.html')
    .pipe(extender({annotations:true,verbose:false}))
    .pipe(gulp.dest('./src/h5/dist/html'))
    .pipe(connect.reload());
});

gulp.task('sass-h5', function () {
    gulp.src('./src/h5/scss/*.scss')
      .pipe(gulpSass())
      .pipe(gulpAutoprefixer())
      .pipe(gulp.dest('./src/h5/dist'))
      .pipe(connect.reload())
  });

gulp.task('image-h5', function () {
  gulp.src('./src/h5/image/*')
    .pipe(gulp.dest('./src/h5/dist/image'))
    .pipe(connect.reload())
});


gulp.task('watch-h5', function () {
  gulp.watch(['./src/h5/*.html'], ['html-h5']);
  gulp.watch(['./src/h5/scss/*.scss'], ['sass-h5']);
  gulp.watch(['./src/h5/image/*'], ['image-h5']);
});
 
gulp.task('h5', ['connect-h5', 'html-h5', 'sass-h5', 'image-h5','watch-h5']);