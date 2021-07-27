const jwtDecode = require('jwt-decode')
const logger = require('../logger')

module.exports = function (authorisedRoles = []) {
  return function (req, res, next) {
    if (req.url === '/refresh') {
      return next()
    }
    if (res.locals && res.locals.user && res.locals.user.token) {
      const { authorities: roles = [] } = jwtDecode(res.locals.user.token)

      if (authorisedRoles.length && !roles.some(role => authorisedRoles.includes(role))) {
        logger.error('User is not authorised to access this')
        return res.redirect('/authError')
      }

      return next()
    }

    req.session.returnTo = req.originalUrl
    return res.redirect('/login')
  }
}
