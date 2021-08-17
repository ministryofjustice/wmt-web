const gulp = require('gulp')
const sass = require('gulp-sass')
const spawn = require('child_process').spawn
const rename = require('gulp-rename')

gulp.task('sync', function (done) {
  const vendorJSFiles = [
    'node_modules/jquery/dist/jquery.min.js'
  ]
  gulp.src(vendorJSFiles, { allowEmpty: true })
    .pipe(gulp.dest('app/assets/javascripts/vendor/'))

  gulp.src('node_modules/govuk-frontend/govuk/all.js')
    .pipe(rename('gov-uk.js'))
    .pipe(gulp.dest('app/assets/javascripts/', { overwrite: true }))

  gulp.src('app/assets/javascripts/**/*.js')
    .pipe(gulp.dest('app/public/javascripts/', { overwrite: true }))

  gulp.src('node_modules/govuk-frontend/govuk/assets/images/**/*')
    .pipe(gulp.dest('app/assets/images/', { overwrite: true }))

  gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('app/public/images/', { overwrite: true }))

  gulp.src('node_modules/govuk-frontend/govuk/assets/fonts/**/*')
    .pipe(gulp.dest('app/assets/fonts/', { overwrite: true }))

  gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('app/public/fonts/', { overwrite: true }))
  done()
})

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

gulp.task('generate-assets', gulp.series(gulp.parallel('sync', 'sass')))

gulp.task('start', function () {
  spawn('node', ['app/bin/www'], { stdio: 'inherit' })
})

gulp.task('generate-assets-and-start', gulp.series('generate-assets', 'start'))

gulp.task('default', gulp.series('generate-assets-and-start'))
