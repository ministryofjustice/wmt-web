const logger = require('./logger')

module.exports = function () {
  return function (error, req, res, next) {
    logger.error(error, `Error handling request for '${req.originalUrl}', user '${res.locals.user?.username}'`)
    if (res.headersSent) {
      return next(error)
    }
    if (error.status === 401 || error.status === 403) {
      logger.info('Logging user out')
      return res.redirect('/sign-out')
    }

    const status = error.status || 500
    switch (status) {
      case 404:
        return res.status(status).render('includes/error-404')
      default:
        return res.status(status).render('includes/error')
    }
  }
}
