const mockViewEngine = require('../../unit/routes/mock-view-engine')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const csurf = require('csurf')

const VIEWS_DIRECTORY = '../../../app/views'

module.exports.buildApp = function (route) {
  var app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // Use cookie parser middleware (required for csurf)
  app.use(cookieParser('secret', { httpOnly: true, secure: false }))

  app.use(cookieSession({
    name: 'session',
    keys: ['test-secret'],
    expires: new Date(2050, 1),
    signed: false
  }))

  // Add mocked user
  app.use(function (req, res, next) {
    req.user = {
      username: 'mockeduser'
    }
    next()
  })

  route(app)
  mockViewEngine(app, VIEWS_DIRECTORY)

  // Check for valid CSRF tokens on state-changing methods.
  var csrfProtection = csurf({ cookie: { httpOnly: true, secure: false } })

  app.use(function (req, res, next) {
    csrfProtection(req, res, next)
  })

  // Generate CSRF tokens to be sent in POST requests
  app.use(function (req, res, next) {
    if (req.hasOwnProperty('csrfToken')) {
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
