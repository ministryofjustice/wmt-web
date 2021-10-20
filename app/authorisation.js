const config = require('../config')
const Unauthorized = require('./services/errors/authentication-error').Unauthorized
const Forbidden = require('./services/errors/authentication-error').Forbidden
const roles = require('./constants/user-roles')

const roleHierarchy = {
  [roles.DATA_ADMIN]: 4,
  [roles.SYSTEM_ADMIN]: 3,
  [roles.MANAGER]: 2,
  [roles.STAFF]: 1
}

const assertUserAuthenticated = function (req) {
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

const hasRole = function (req, roles) {
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

const hasAccessToRole = function (userRole, toAssignRole) {
  return roleHierarchy[userRole] >= roleHierarchy[toAssignRole]
}

const isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

const getAuthorisedUserRole = function (req) {
  const result = {
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
module.exports.hasAccessToRole = hasAccessToRole
