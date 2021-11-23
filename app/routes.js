/** * This file defines all routes used in this application. Any logic that is
 * applicable to all routes can be added here.
 */

const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(path.resolve(__dirname, 'routes'))

module.exports = function (router) {
  const routes = files.map((file) => {
    return require(path.resolve(__dirname, 'routes', file.replace('.js', '')))
  })

  routes.forEach(function (route) {
    route(router)
  })
}
