
const express = require('express')
const expressSanitized = require('express-sanitized')
const csurf = require('csurf')
const nunjucks = require('express-nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')
const routes = require('./routes')
const getOrganisationalHierarchyTree = require('./services/organisational-hierarchy-tree')
const logger = require('./logger')
const setUpHealthChecks = require('./middleware/setUpHealthChecks')
const setUpAuthentication = require('./middleware/setUpAuthentication')
const populateCurrentUser = require('./middleware/populateCurrentUser')
const setUpWebRequestParsing = require('./middleware/setUpRequestParsing')
const setUpWebSecurity = require('./middleware/setUpWebSecurity')
const setUpWebSession = require('./middleware/setUpWebSession')
const setUpStaticResources = require('./middleware/setUpStaticResources')
const authorisationMiddleware = require('./middleware/authorisationMiddleware')

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
app.use(setUpAuthentication())
app.use(authorisationMiddleware(['ROLE_WORKLOAD_MEASUREMENT']))

const developmentMode = app.get('env') === 'development'

app.set('view engine', 'html')
app.set('views', [path.join(__dirname, 'views'), 'node_modules/govuk-frontend/'])

const nunjucksObj = nunjucks(app, {
  watch: developmentMode,
  noCache: developmentMode
})

nunjucksObj.env.addFilter('date', dateFilter)
nunjucksObj.env.addFilter('isObject', function (obj) {
  return typeof obj === 'object'
})

app.use(expressSanitized())

// Send assetPath to all views.
app.use(function (req, res, next) {
  res.locals.assetPath = '/public/'
  next()
})

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
routes(router)

app.use('/', router)

// catch 404 and forward to error handler.
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.status(404)
  next(err)
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

// Development error handler.
app.use(function (err, req, res) {
  logger.error({ error: err })
  res.status(err.status || 500)
  if (err.status === 404) {
    res.render('includes/error-404')
  } else {
    res.render('includes/error', {
      error: developmentMode ? err : null
    })
  }
})

// Build the organisational hierarchy tree from DB
getOrganisationalHierarchyTree.build()

module.exports = app
