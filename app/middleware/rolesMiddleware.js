const userRoles = require('../constants/user-roles')
module.exports = function () {
  return async function (req, res, next) {
    if (res.locals.user) {
      res.locals.canViewAdmin = [userRoles.SUPER_USER, userRoles.APPLICATION_SUPPORT].includes(res.locals.user.user_role)
      res.locals.canViewExpiringReductions = [userRoles.SUPER_USER, userRoles.MANAGER].includes(res.locals.user.user_role)
      res.locals.canExportReductions = [userRoles.SUPER_USER, userRoles.MANAGER].includes(res.locals.user.user_role)
      res.locals.canExportOverview = [userRoles.SUPER_USER, userRoles.MANAGER, userRoles.STAFF].includes(res.locals.user.user_role)
    }
    next()
  }
}
