const express = require('express')

module.exports = function () {
  const router = express.Router()
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))
  return router
}
