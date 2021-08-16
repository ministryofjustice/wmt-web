const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
module.exports = function(app, path) {
    

app.set('view engine', 'njk')

const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../views'),
      'node_modules/govuk-frontend/',
      'node_modules/govuk-frontend/components/',
      'node_modules/@ministryofjustice/frontend/',
      'node_modules/@ministryofjustice/frontend/moj/components/',
    ],
    {
      autoescape: true,
      express: app,
    }
  )

njkEnv.addFilter('date', dateFilter)
njkEnv.addFilter('isObject', function (obj) {
  return typeof obj === 'object'
})

}