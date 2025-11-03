const express = require('express')
const path = require('path')
const createError = require('http-errors')
const routes = require('./routes')
const setUpHealthChecks = require('./middleware/setUpHealthChecks')
const setUpAuthentication = require('./middleware/setUpAuthentication')
const setUpWebRequestParsing = require('./middleware/setUpRequestParsing')
const setUpWebSecurity = require('./middleware/setUpWebSecurity')
const setUpWebSession = require('./middleware/setUpWebSession')
const setUpStaticResources = require('./middleware/setUpStaticResources')
const authorisationMiddleware = require('./middleware/authorisationMiddleware')
const rolesMiddleware = require('./middleware/rolesMiddleware')
const setupCacheControl = require('./middleware/setupCacheControl')
const checkEtlInProgress = require('./middleware/check-etl-in-progress')
const nunjucksSetup = require('./utils/nunjucksSetup')
const setUpCsrf = require('./middleware/setUpCsrf')
const setUpCurrentUser = require('./middleware/setUpCurrentUser')
const getUnallocatedCasesCount = require('./middleware/getUnallocatedCasesCount')
const errorHandler = require('./errorHandler')
const pdsComponents = require('@ministryofjustice/hmpps-probation-frontend-components')
const config = require('../config')
const logger = require('../logger')

module.exports.createApplication = async function () {
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
  app.use(setUpCsrf())
  app.use(setUpCurrentUser())
  app.get('*', pdsComponents.getPageComponents({
    pdsUrl: config.apis.probationApi.url,
    logger
  })
  )
  app.use(checkEtlInProgress)
  app.use(getUnallocatedCasesCount())

  app.use(routes())

  app.use((req, res, next) => next(createError(404, 'Not found')))

  app.use(errorHandler())

  return Promise.resolve(app)
}
