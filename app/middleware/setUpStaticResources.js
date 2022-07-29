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

  Array.of(
    '/app/public',
    '/node_modules/govuk-frontend/govuk/assets',
    '/node_modules/govuk-frontend',
    '/node_modules/@ministryofjustice/frontend/moj/assets',
    '/node_modules/@ministryofjustice/frontend',
    '/node_modules/jquery/dist'
  ).forEach(dir => {
    router.use('/assets', express.static(path.join(process.cwd(), dir), cacheControl))
  })

  Array.of('/node_modules/govuk_frontend_toolkit/images').forEach(dir => {
    router.use('/assets/images/icons', express.static(path.join(process.cwd(), dir), cacheControl))
  })

  router.use('/favicon.ico', express.static(path.join(process.cwd(), '/app/public/images/favicon.ico'), cacheControl))

  return router
}
