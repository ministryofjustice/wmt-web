/** * This file defines all routes used in this application. Any logic that is
 * applicable to all routes can be added here.
 */

const fs = require('fs')
const path = require('path')
const asyncMiddleware = require('./middleware/asyncMiddleware')
const files = fs.readdirSync(path.resolve(__dirname, 'routes'))

module.exports = function (router) {
  const routes = files.map((file) => {
    return require(path.resolve(__dirname, 'routes', file.replace('.js', '')))
  })
  const get = function (path, handler) {
    router.get(path, asyncMiddleware(handler))
  }
  const post = function (path, handler) {
    router.post(path, asyncMiddleware(handler))
  }
  routes.forEach(function (route) {
    route(get, post)
  })
}
