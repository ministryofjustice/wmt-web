const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const { tagManagerContainerid, nav } = require('../../config')
const { initialiseName } = require('./utils')

module.exports = function (app, path) {
  app.set('view engine', 'njk')

  app.locals.assetPath = '/public'

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../views'),
      'node_modules/govuk-frontend/dist',
      'node_modules/govuk-frontend/dist/components/',
      'node_modules/@ministryofjustice/frontend/',
      'node_modules/@ministryofjustice/frontend/moj/components/'
    ],
    {
      autoescape: true,
      express: app
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

  njkEnv.addGlobal('tagManagerContainerid', tagManagerContainerid)
  njkEnv.addGlobal('allocationsUrl', nav.allocations.url)
}
