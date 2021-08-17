const gulp = require('gulp')
const sass = require('gulp-sass')
const spawn = require('child_process').spawn

gulp.task('sass', function (done) {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass({
      style: 'expanded',
      sourcemap: true,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/public/stylesheets'))
  done()
})

gulp.task('generate-assets', gulp.series(gulp.parallel('sass')))

gulp.task('start', function () {
  spawn('node', ['app/bin/www'], { stdio: 'inherit' })
})

gulp.task('generate-assets-and-start', gulp.series('generate-assets', 'start'))

gulp.task('default', gulp.series('generate-assets-and-start'))
