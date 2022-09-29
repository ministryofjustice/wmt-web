const contractedHoursService = require('../services/contracted-hours-service')
const getSubNav = require('../services/get-sub-nav')
const ErrorHandler = require('../services/validators/error-handler')
const FieldValidator = require('../services/validators/field-validator')
const ValidationError = require('../services/errors/validation-error')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const { PROBATION } = require('../constants/workload-type')
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/' + PROBATION + '/offender-manager/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = 'offender-manager'
    const id = req.params.id
    const workloadType = PROBATION

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return contractedHoursService.getContractedHours(id, organisationLevel)
      .then(function (result) {
        return res.render('contracted-hours', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path, workloadType, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          contractedHours: result.contractedHours,
          woId: id,
          hoursUpdatedSuccess: req.query.hoursUpdatedSuccess,
          workloadType,
          onOffenderManager: true
        })
      }).catch(function (error) {
        next(error)
      })
  })

  router.post('/' + PROBATION + '/offender-manager/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const organisationLevel = 'offender-manager'
    const id = req.params.id
    const updatedHours = req.body.hours

    try {
      isValid(updatedHours, next)
    } catch (error) {
      if (error instanceof ValidationError) {
        return contractedHoursService.getContractedHours(id, organisationLevel)
          .then(function (result) {
            const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
            return res.render('contracted-hours', {
              errors: error.validationErrors,
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              subNav: getSubNav(id, organisationLevel, req.path, PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
              contractedHours: updatedHours,
              workloadType: PROBATION,
              woId: id,
              onOffenderManager: true

            })
          }).catch(function (error) {
            next(error)
          })
      } else {
        next(error)
      }
    }

    return contractedHoursService.updateContractedHours(id, updatedHours, res.locals.user.email)
      .then(function () {
        return res.redirect('/' + PROBATION + '/offender-manager/' + id + '/contracted-hours?hoursUpdatedSuccess=true')
      }).catch(function (error) {
        next(error)
      })
  })

  function isValid (updatedHours) {
    const errors = ErrorHandler()
    FieldValidator(updatedHours, 'hours', errors)
      .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      .isFloat(0, 37.5)

    const validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}
