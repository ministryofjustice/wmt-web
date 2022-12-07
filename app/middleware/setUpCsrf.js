const { Router } = require('express')
const csurf = require('csurf')

module.exports = function () {
  const router = Router({ mergeParams: true })

  router.use(csurf())

  router.use(function (req, res, next) {
    if (Object.prototype.hasOwnProperty.call(req, 'csrfToken')) {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  return router
}
