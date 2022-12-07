const { Router } = require('express')
const auth = require('../authentication/auth')
const populateCurrentUser = require('./populateCurrentUser')

module.exports = function () {
  const router = Router({ mergeParams: true })
  router.use(auth.authenticationMiddleware())
  router.use(populateCurrentUser())
  return router
}
