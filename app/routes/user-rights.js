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

const searchTabTitle = {
  second: 'User rights',
  third: 'Admin'
}

const userRightsTabTitle = {
  second: 'Amend user rights',
  third: 'Admin'
}

module.exports = function (get, post) {
  get('/admin/user', function (req, res) {
    try {
      authorisation.hasRole(req, [roles.APPLICATION_SUPPORT, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const breadcrumbs = [
      new Link('User Rights', '/admin/user'),
      new Link('Admin', '/admin')
    ]

    const fail = req.query.fail

    const failureText = fail ? 'Invalid username specified' : null
    return res.render('user', {
      title: 'User rights',
      tabTitle: searchTabTitle,
      breadcrumbs,
      failureText,
      onAdmin: true

    })
  })

  post('/admin/user-rights', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.APPLICATION_SUPPORT, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

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
        title: 'Amend user rights',
        tabTitle: userRightsTabTitle,
        username,
        fullname: role.fullname,
        userIsSuperUser: roles.SUPER_USER === role.role,
        userIsApplicationSupport: roles.APPLICATION_SUPPORT === role.role,
        userIsManager: roles.MANAGER === role.role,
        userIsStaff: roles.STAFF === role.role,
        breadcrumbs,
        canAssignSuperAdmin: roles.SUPER_USER === authorisedUserRole.userRole,
        onAdmin: true

      })
    }).catch(function (error) {
      next(error)
    })
  })

  post('/admin/user-rights/:username', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.APPLICATION_SUPPORT, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

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
          title: 'Amend user rights',
          tabTitle: userRightsTabTitle,
          username,
          fullname: req.body.fullname,
          userIsSuperUser: roles.SUPER_USER === req.body.rights,
          userIsApplicationSupport: roles.APPLICATION_SUPPORT === req.body.rights,
          userIsManager: roles.MANAGER === req.body.rights,
          userIsStaff: roles.STAFF === req.body.rights,
          errors: error.validationErrors,
          breadcrumbs,
          canAssignSuperAdmin: roles.SUPER_USER === authorisedUserRole.userRole,
          onAdmin: true
        })
      } else {
        next(error)
      }
    }

    return addUpdateUserRole(username, rights, loggedInUsername, thisUser.name).then(function (result) {
      return res.render('user', {
        title: 'User rights',
        userRights: { username, rights },
        onAdmin: true

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

const removeUserRole = function (existingUser) {
  return userRoleService.removeUserRoleByUserId(existingUser.id)
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
                  return removeUserRole(existingUser)
                }
                return upsertUserAndRole(existingUser, existingRole, role, loggedInUser, fullname)
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

const upsertUserAndRole = function (existingUser, existingRole, role, loggedInUser, fullName) {
  return userRoleService.updateUser(existingUser.id, fullName).then(function () {
    if (existingRole.userRoleId) {
      return userRoleService.updateUserRole(existingUser.id, role.id, loggedInUser.id)
    } else {
      const newUserRole = new UserRole(existingUser.id, role.id, new Date(), loggedInUser.id)
      return userRoleService.addUserRole(newUserRole)
    }
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
