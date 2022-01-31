const { initialiseAppInsights, buildAppInsightsClient } = require('../services/azure-appinsights')

initialiseAppInsights()
buildAppInsightsClient()
/**
 * Module dependencies.
 */
const app = require('../app')
const logger = require('../logger')

app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`)
})
