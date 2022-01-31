const { initialiseAppInsights, buildAppInsightsClient } = require('../services/azure-appinsights')

initialiseAppInsights()
buildAppInsightsClient()
/**
 * Module dependencies.
 */
const { createApplication } = require('../app')
const logger = require('../logger')

createApplication().then(app => {
  app.listen(app.get('port'), () => {
    logger.info(`Server listening on port: ${app.get('port')}`)
  })
}).catch(error => {
  logger.error(`Failed to start application: ${error.message}`)
})
