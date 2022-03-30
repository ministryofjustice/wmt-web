const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const { googleAnalyticsKey, nav } = require('../../config')

module.exports = function (app, path) {
  app.set('view engine', 'njk')

  app.locals.assetPath = '/public'

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../views'),
      'node_modules/govuk-frontend/',
      'node_modules/govuk-frontend/components/',
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

  njkEnv.addFilter('initialiseName', (fullName) => {
    // this check is for the authError page
    if (!fullName) {
      return null
    }
    const array = fullName.split(' ')
    return `${array[0][0]}. ${array.reverse()[0]}`
  })

  njkEnv.addGlobal('googleAnalyticsKey', googleAnalyticsKey)
  njkEnv.addGlobal('allocationsUrl', nav.allocations.url)
}
