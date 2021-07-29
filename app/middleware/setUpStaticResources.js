const path = require('path')
const compression = require('compression')
const express = require('express')

module.exports = function () {
  const router = express.Router()

  router.use(compression())
  router.use('/public', express.static(path.join(process.cwd(), '/app/public')))

  return router
}
