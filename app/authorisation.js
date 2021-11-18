const Forbidden = require('./services/errors/authentication-error').Forbidden
const roles = require('./constants/user-roles')

const roleHierarchy = {
  [roles.SUPER_USER]: 4,
  [roles.APPLICATION_SUPPORT]: 3,
  [roles.MANAGER]: 2,
  [roles.STAFF]: 1
}

const hasRole = function (req, roles) {
  if (!roles.includes(req.user.user_role)) {
    throw new Forbidden('Unauthorized', 'includes/message')
  }
}

const hasAccessToRole = function (userRole, toAssignRole) {
  return roleHierarchy[userRole] >= roleHierarchy[toAssignRole]
}

const getAuthorisedUserRole = function (req) {
  const result = {
    userRole: ''
  }
  if (req.user) {
    result.userRole = req.user.user_role
  }
  return result
}

module.exports.hasRole = hasRole
module.exports.getAuthorisedUserRole = getAuthorisedUserRole
module.exports.hasAccessToRole = hasAccessToRole
