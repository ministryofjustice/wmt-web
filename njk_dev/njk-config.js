const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const { googleAnalyticsKey, nav } = require('../config')
const { initialiseName } = require('../app/utils/utils')

module.exports = {
  njkEnvConfig: function() {
    // Copied from nunjucksSetup
    const njkEnv = nunjucks.configure(
      [
        // Relative to the dir we are running from - maybe use __dirName as well?
        'app/views',
        'node_modules/govuk-frontend/',
        'node_modules/govuk-frontend/components/',
        'node_modules/@ministryofjustice/frontend/',
        'node_modules/@ministryofjustice/frontend/moj/components/'
      ],
      {
        autoescape: true,
      }
    )

    njkEnv.addFilter('date', dateFilter)
    njkEnv.addFilter('isObject', function (obj) {
      return typeof obj === 'object'
    })

    njkEnv.addFilter('initialiseName', initialiseName)

    njkEnv.addFilter('getCaseCount', (cases) => {
      return cases > 99 ? '99+' : `${cases}`
    })

    njkEnv.addGlobal('googleAnalyticsKey', googleAnalyticsKey)
    njkEnv.addGlobal('allocationsUrl', nav.allocations.url)

    return njkEnv
  }
}
