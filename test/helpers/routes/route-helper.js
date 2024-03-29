const mockViewEngine = require('../../unit/routes/mock-view-engine')
const express = require('express')
const cookieSession = require('cookie-session')
const csurf = require('csurf')
const setupCacheControl = require('../../../app/middleware/setupCacheControl')
const VIEWS_DIRECTORY = '../../../app/views'

module.exports.buildApp = function (route, middleware) {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(cookieSession({
    name: 'session',
    keys: ['test-secret'],
    expires: new Date(2050, 1),
    signed: false
  }))
  app.use(setupCacheControl())
  if (middleware) {
    app.use(middleware)
  }

  route(app.get.bind(app), app.post.bind(app))
  mockViewEngine(app, VIEWS_DIRECTORY)

  // Check for valid CSRF tokens on state-changing methods.
  const csrfProtection = csurf({ cookie: { httpOnly: true, secure: false } })

  app.use(function (req, res, next) {
    csrfProtection(req, res, next)
  })

  // Generate CSRF tokens to be sent in POST requests
  app.use(function (req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req, 'csrfToken')) {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  // catch CSRF token errors
  app.use(function (err, req, res, next) {
    const CSURF_ERROR_CODE = 'EBADCSRFTOKEN'
    if (err.code !== CSURF_ERROR_CODE) return next(err)
    res.status(403)
    res.render('includes/error', {
      error: 'Invalid CSRF token'
    })
  })

  app.use(function (req, res, next) {
    next(new Error())
  })

  app.use(function (err, req, res, next) {
    if (err) {
      res.status(500).render('includes/error')
    }
  })
  return app
}
