const config = require('../config')
const Unauthorized = require('./services/errors/authentication-error').Unauthorized
const Forbidden = require('./services/errors/authentication-error').Forbidden

var assertUserAuthenticated = function (req) {
  if (isAuthenticationEnabled()) {
    if (!req.user) {
      // To handle bookmarks we need to store unauthenticated requests only
      if ((req.path !== '/') && (req.path !== '/login')) {
        req.session.redirectTo = req.path
      }
      throw new Unauthorized('Unauthorized', '/login')
    }
  }
}

var hasRole = function (req, roles) {
  if (isAuthenticationEnabled()) {
    if (roles instanceof Array) {
      if (!roles.includes(req.user.user_role)) {
        throw new Forbidden('Unauthorized', 'includes/message')
      }
    } else {
      throw new Forbidden('Unauthorized', 'includes/message')
    }
  }
}

var isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

var getAuthorisedUserRole = function (req) {
  var result = {
    authorisation: isAuthenticationEnabled(),
    userRole: ''
  }
  if (req.user) {
    result.userRole = req.user.user_role
  }
  return result
}

module.exports.hasRole = hasRole
module.exports.assertUserAuthenticated = assertUserAuthenticated
module.exports.isAuthenticationEnabled = isAuthenticationEnabled
module.exports.getAuthorisedUserRole = getAuthorisedUserRole
