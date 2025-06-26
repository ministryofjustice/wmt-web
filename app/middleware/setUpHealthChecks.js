const express = require('express')

module.exports = function () {
  const router = express.Router()

  router.get('/health', function (req, res) {
    res.send({
      status: 'ok'
    })
  })

  router.get('/ping', function (req, res) {
    res.send({
      status: 'UP'
    })
  })

  return router
}
