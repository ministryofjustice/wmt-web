const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const fieldValidator = require('../services/validators/field-validator')
const errorHandler = require('../services/validators/error-handler')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const User = require('../services/domain/user')
const ValidationError = require('../services/errors/validation-error')
const log = require('../logger')

module.exports = function (router) {
  router.get('/admin/user', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    const breadcrumbs = [
      new Link('User Rights', '/admin/user'),
      new Link('Admin', '/admin')
    ]

    const fail = req.query.fail

    const failureText = fail ? 'Invalid username specified' : null
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return res.render('user', {
      title: 'User rights',
      breadcrumbs: breadcrumbs,
      failureText: failureText,
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    })
  })

  router.post('/admin/user-rights', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    const breadcrumbs = [
      new Link('User Rights', '/admin/user-rights'),
      new Link('Admin', '/admin')
    ]

    const username = req.body.username

    if (!isValidUsername(username)) {
      return res.redirect(302, '/admin/user?fail=true')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return userRoleService.getRoleByUsername(userRoleService.removeDomainFromUsername(username)).then(function (role) {
      return res.render('user-rights', {
        title: 'User rights',
        username: username,
        fullname: role.fullname,
        rights: role.role,
        breadcrumbs: breadcrumbs,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/admin/user-rights/:username', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    const rights = req.body.rights
    const username = req.params.username
    const loggedInUsername = req.user.username

    let thisUser
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    try {
      thisUser = new User(req.body.fullname)
    } catch (error) {
      if (error instanceof ValidationError) {
        const breadcrumbs = [
          new Link('User Rights', '/admin/user-rights'),
          new Link('Admin', '/admin')
        ]
        return res.render('user-rights', {
          title: 'User rights',
          username: username,
          fullname: req.body.fullname,
          rights: req.body.rights,
          errors: error.validationErrors,
          breadcrumbs: breadcrumbs,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
        })
      } else {
        next(error)
      }
    }

    return addUpdateUserRole(username, rights, loggedInUsername, thisUser.name).then(function (result) {
      return res.render('user', {
        title: 'User rights',
        userRights: { username: username, rights: rights },
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
      })
    }).catch(function (error) {
      log.error(error)
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED
        })
      }
      next(error)
    })
  })
}

const removeUserRole = function (username) {
  return userRoleService.getUserByUsername(userRoleService.removeDomainFromUsername(username)).then(function (user) {
    if (user) {
      return userRoleService.removeUserRoleByUserId(user.id).then(function () {
        return userRoleService.removeUserByUsername(userRoleService.removeDomainFromUsername(user.username))
      })
    }
  })
}

const addUpdateUserRole = function (username, rights, loggedInUsername, fullname) {
  const assignUserToRole = userRoleService.removeDomainFromUsername(username)
  return userRoleService.getUserByUsername(assignUserToRole).then(function (existingUser) {
    return userRoleService.getUserByUsername(loggedInUsername).then(function (loggedInUser) {
      return userRoleService.getRole(rights).then(function (role) {
        return userRoleService.getRoleByUsername(loggedInUser.username).then(function (loggedInUserRole) {
          return userRoleService.getRoleByUsername(assignUserToRole).then(function (existingRole) {
            if (authorisation.hasAccessToRole(loggedInUserRole.role, role.role) && authorisation.hasAccessToRole(loggedInUserRole.role, existingRole.role)) {
              if (existingUser) {
                if (rights === roles.STAFF) {
                  return removeUserRole(username)
                }
                return updateUserAndRole(existingUser, role, fullname, loggedInUser)
              } else {
                return createUserAndRole(role, username, fullname, loggedInUser)
              }
            } else {
              throw new Forbidden('Unauthorized', 'includes/message')
            }
          })
        })
      })
    })
  })
}

const createUserAndRole = function (toAssignRole, email, fullName, loggedInUser) {
  return userRoleService.addUser(userRoleService.removeDomainFromUsername(email), fullName).then(function (userId) {
    const newUserRole = new UserRole(userId, toAssignRole.id, new Date(), loggedInUser.id)
    return userRoleService.addUserRole(newUserRole)
  })
}

const updateUserAndRole = function (existingUser, toAssignRole, fullName, loggedInUser) {
  return userRoleService.updateUser(existingUser.id, fullName).then(function () {
    return userRoleService.updateUserRole(existingUser.id, toAssignRole.id, loggedInUser.id)
  })
}

const isValidUsername = function (username) {
  const errors = errorHandler()

  fieldValidator(username, 'username', errors)
    .isValidUsername(username)

  if (errors.get()) {
    return false
  }
  return true
}
