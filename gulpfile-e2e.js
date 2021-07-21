const gulp = require('gulp')
const selenium = require('selenium-standalone')
const webdriver = require('gulp-webdriver')

let seleniumServer

gulp.task('selenium', (done) => {
  selenium.install({
    logger: console.log,
    drivers: {
      chrome: {
        version: '92.0.4515.43'
      }
    }
  }, () => {
    selenium.start((err, child) => {
      if (err) { return done(err) }
      seleniumServer = child
      done()
    })
  })
})

gulp.task('e2e', gulp.series('selenium', (done) => {
  gulp.src('test/e2e.conf.js')
    .pipe(webdriver()).on('error', () => {
      seleniumServer.kill()
      process.exit(1)
    })
    .once('error', function () { // Explicit exit for gulp-mocha
      seleniumServer.kill()
      process.exit(1)
    })
    .once('end', function () {
      seleniumServer.kill()
      process.exit()
    })
  done()
}))

gulp.task('default', gulp.series('e2e'))
