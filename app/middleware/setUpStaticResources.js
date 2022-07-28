const path = require('path')
const compression = require('compression')
const express = require('express')
const config = require('../../config')

module.exports = function () {
  const router = express.Router()

  router.use(compression())

  //  Static Resources Configuration
  const cacheControl = { maxAge: config.staticResourceCacheDuration * 1000 }

  router.use('/public', express.static(path.join(process.cwd(), '/app/public'), cacheControl))

  router.use('/favicon.ico', express.static(path.join(process.cwd(), '/app/public/images/favicon.ico'), cacheControl))

  return router
}
