const express = require('express')

module.exports = function () {
  const router = express.Router()

  router.get('/ping', function (req, res) {
    res.send({
      status: 'UP'
    })
  })

  return router
}
