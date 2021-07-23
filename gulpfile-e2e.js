const gulp = require('gulp')
const selenium = require('selenium-standalone')
const webdriver = require('gulp-webdriver')

let seleniumServer

gulp.task('selenium', (done) => {
  selenium.install({
     logger: console.log,
     drivers: {
      chrome: {
        version: 'latest',
        fallbackVersion: '91.0.4472.101',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com',
      }
    }
    })
  .then(function () {
    selenium.start({
      drivers: {
        chrome: {
          version: 'latest',
        },
      }
    }).then(function(childProcess) {
      seleniumServer = childProcess
      done()
    }).catch(function(err) {
      done(err)
    })
    
  }).catch(function(err) {
    done(err)
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
