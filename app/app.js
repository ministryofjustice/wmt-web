const express = require('express')
const csurf = require('csurf')
const path = require('path')
const routes = require('./routes')
const logger = require('./logger')
const setUpHealthChecks = require('./middleware/setUpHealthChecks')
const setUpAuthentication = require('./middleware/setUpAuthentication')
const populateCurrentUser = require('./middleware/populateCurrentUser')
const setUpWebRequestParsing = require('./middleware/setUpRequestParsing')
const setUpWebSecurity = require('./middleware/setUpWebSecurity')
const setUpWebSession = require('./middleware/setUpWebSession')
const setUpStaticResources = require('./middleware/setUpStaticResources')
const authorisationMiddleware = require('./middleware/authorisationMiddleware')
const rolesMiddleware = require('./middleware/rolesMiddleware')
const setupCacheControl = require('./middleware/setupCacheControl')
const checkEtlInProgress = require('./middleware/check-etl-in-progress')
const nunjucksSetup = require('./utils/nunjucksSetup')

const auth = require('./authentication/auth')
const userService = require('./services/user-service')

const app = express()

app.set('json spaces', 2)
app.set('trust proxy', true)
app.set('port', process.env.PORT || 3000)

app.use(setUpHealthChecks())
app.use(setUpWebSecurity())
app.use(setUpWebSession())
app.use(setUpWebRequestParsing())
app.use(setUpStaticResources())
nunjucksSetup(app, path)
app.use(setUpAuthentication())
app.use(authorisationMiddleware(['ROLE_WORKLOAD_MEASUREMENT']))
app.use(rolesMiddleware())
app.use(setupCacheControl())

// Log each HTML request and it's response.
app.use(function (req, res, next) {
  // Log response started.
  logger.info(req.method, req.path, 'called.')
  next()
})

// Check for valid CSRF tokens on state-changing methods.
app.use(csurf())

// Generate CSRF tokens to be sent in POST requests
app.use(function (req, res, next) {
  if (Object.prototype.hasOwnProperty.call(req, 'csrfToken')) {
    res.locals.csrfToken = req.csrfToken()
  }
  next()
})

// Build the router to route all HTTP requests and pass to the routes file for route configuration.
const router = express.Router({ mergeParams: true })
router.use(auth.authenticationMiddleware())
router.use(populateCurrentUser(userService))

app.use(checkEtlInProgress)

routes(router)

app.use('/', router)

// catch CSRF token errors
app.use(function (err, req, res, next) {
  const CSURF_ERROR_CODE = 'EBADCSRFTOKEN'
  if (err.code !== CSURF_ERROR_CODE) return next(err)
  res.status(403)
  return res.render('includes/error', {
    error: 'Invalid CSRF token'
  })
})

app.use(function (req, res) {
  res.status(404)
  return res.render('includes/error-404')
})

app.use(function (err, req, res, next) {
  logger.error(err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500)
  if (err.status === 404) {
    return res.render('includes/error-404')
  }
  return res.render('includes/error')
})

module.exports = app
