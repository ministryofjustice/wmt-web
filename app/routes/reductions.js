const organisationUnitConstants = require('../constants/organisation-unit')
const reductionsService = require('../services/reductions-service')
const getSubNav = require('../services/get-sub-nav')
const Reduction = require('../services/domain/reduction')
const reductionStatusType = require('../constants/reduction-status-type')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const { PROBATION } = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const ErrorHandler = require('../services/validators/error-handler')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated

module.exports = function (get, post) {
  get('/' + PROBATION + '/:organisationLevel/:id/reductions', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    const successText = getStatusText(req)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    let reductionsResultData

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return reductionsService.getReductions(id, organisationLevel).then(function (result) {
        result.date = lastUpdated
        reductionsResultData = result

        if (req.session.ContractedHoursIsZero === true) {
          delete req.session.ContractedHoursIsZero
          const errors = ErrorHandler()
          errors.add('headingActive', ERROR_MESSAGES.getContractedHoursAreZero)
          throw new ValidationError(errors.get())
        } else {
          return renderReductionsMainPage(req, res, reductionsResultData, successText, id, organisationLevel)
        }
      })
    }).catch(function (error) {
      if (error instanceof ValidationError) {
        return renderReductionsMainPage(req, res, reductionsResultData, successText, id, organisationLevel, error)
      } else {
        next(error)
      }
    })
  })

  get('/' + PROBATION + '/:organisationLevel/:id/add-reduction', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = parseInt(req.params.id)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return reductionsService.getAddReductionsRefData(id, organisationLevel)
      .then(function (result) {
        const errors = req.session.addReductionErrors
        delete req.session.addReductionErrors

        if (result.contractedHours === 0) {
          req.session.ContractedHoursIsZero = true
          const routeToReductionPage = '/' + PROBATION + '/' + organisationLevel + '/' + id + '/reductions'
          res.redirect(routeToReductionPage)
        } else {
          const subNav = getSubNav(id, organisationLevel, req.path, PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
          return res.render('add-reduction', {
            breadcrumbs: result.breadcrumbs,
            linkId: id,
            title: result.title,
            subTitle: result.subTitle,
            tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
            subNav,
            referenceData: result.referenceData,
            stringifiedReferenceData: stringifyReductionsData(result.referenceData),
            errors,

            reductionToPopulate: false,
            reductionEnabled: false,
            onOffenderManager: true

          })
        }
      }).catch(function (error) {
        next(error)
      })
  })

  get('/' + PROBATION + '/:organisationLevel/:id/edit-reduction', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const organisationLevel = req.params.organisationLevel
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = parseInt(req.params.id)
    const reductionId = parseInt(req.query.reductionId)

    reductionsService.getAddReductionsRefData(id, organisationLevel)
      .then(function (result) {
        return reductionsService.getReductionByReductionId(reductionId)
          .then(function (reduction) {
            if (reduction !== undefined && reduction.workloadOwnerId !== id) {
              reduction = undefined
            }
            let reductionEnabled, reductionStatus
            if (!reduction) {
              reductionEnabled = false
              reductionStatus = ''
            } else {
              reductionEnabled = reduction.isEnabled
              reductionStatus = reduction.status
            }
            const subNav = getSubNav(id, organisationLevel, req.path, PROBATION)
            return res.render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
              subNav,
              referenceData: result.referenceData,
              stringifiedReferenceData: stringifyReductionsData(result.referenceData),
              reduction: mapReductionToViewModel(reduction),
              reductionToPopulate: true,
              reductionEnabled,
              reductionStatus,

              onOffenderManager: true
            })
          })
      }).catch(function (error) {
        next(error)
      })
  })

  post('/' + PROBATION + '/:organisationLevel/:id/add-reduction', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = req.params.id
    let reduction
    let reductionReason

    return reductionsService.getAddReductionsRefData(id, organisationLevel)
      .then(function (result) {
        try {
        // Find the index in the array of reasons where this reason occurs
          const index = result.referenceData.findIndex(reason => reason.id === parseInt(req.body.reasonForReductionId))
          reductionReason = result.referenceData[index]
          let userId = null
          if (req.user !== undefined && req.user !== null) {
            userId = req.user.userId
          }
          reduction = generateNewReductionFromRequest(req.body, reductionReason, userId)
        } catch (error) {
          if (error instanceof ValidationError) {
            const subNav = getSubNav(id, organisationLevel, req.path, PROBATION)
            return res.status(400).render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
              subNav,
              referenceData: result.referenceData,
              stringifiedReferenceData: stringifyReductionsData(result.referenceData),
              reduction: {
                id: req.body.reductionId,
                reasonId: req.body.reasonForReductionId,
                hours: req.body.reductionHours,
                start_day: req.body.redStartDay,
                start_month: req.body.redStartMonth,
                start_year: req.body.redStartYear,
                end_day: req.body.redEndDay,
                end_month: req.body.redEndMonth,
                end_year: req.body.redEndYear,
                notes: req.body.notes,
                isEnabled: reductionReason.isEnabled
              },
              reductionToPopulate: true,
              reductionEnabled: reductionReason.isEnabled,
              errors: error.validationErrors,

              onOffenderManager: true

            })
          } else {
            next(error)
          }
        }

        return reductionsService.addReduction(id, reduction, res.locals.user.email).then(function () {
          return res.redirect(302, '/' + PROBATION + '/' + organisationLevel + '/' + id + '/reductions')
        })
      }).catch(function (error) {
        next(error)
      })
  })

  post('/' + PROBATION + '/:organisationLevel/:id/edit-reduction', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = req.params.id
    const reductionId = req.body.reductionId
    let reduction
    let reductionReason
    return reductionsService.getAddReductionsRefData(id, organisationLevel)
      .then(function (result) {
        try {
          // Find the index in the array of reasons where this reason occurs
          const index = result.referenceData.findIndex(reason => reason.id === parseInt(req.body.reasonForReductionId))
          reductionReason = result.referenceData[index]
          let userId = null
          if (req.user !== undefined && req.user !== null) {
            userId = req.user.userId
          }
          reduction = generateNewReductionFromRequest(req.body, reductionReason, userId)
        } catch (error) {
          if (error instanceof ValidationError) {
            const subNav = getSubNav(id, organisationLevel, req.path, PROBATION)
            return res.status(400).render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
              subNav,
              referenceData: result.referenceData,
              stringifiedReferenceData: stringifyReductionsData(result.referenceData),
              reduction: {
                id: req.body.reductionId,
                reasonId: req.body.reasonForReductionId,
                hours: req.body.reductionHours,
                start_day: req.body.redStartDay,
                start_month: req.body.redStartMonth,
                start_year: req.body.redStartYear,
                end_day: req.body.redEndDay,
                end_month: req.body.redEndMonth,
                end_year: req.body.redEndYear,
                notes: req.body.notes,
                isEnabled: reductionReason.isEnabled
              },
              reductionToPopulate: true,
              reductionEnabled: reductionReason.isEnabled,
              errors: error.validationErrors,

              onOffenderManager: true
            })
          } else {
            next(error)
          }
        }

        return reductionsService.getOldReductionForHistory(reductionId).then(function (oldReduction) {
          return reductionsService.addOldReductionToHistory(oldReduction).then(function () {
            return reductionsService.updateReduction(id, reductionId, reduction, oldReduction, res.locals.user.email)
              .then(function () {
                return res.redirect(302, '/' + PROBATION + '/' + organisationLevel + '/' + id + '/reductions')
              }).catch(function (error) {
                next(error)
              })
          })
        })
      })
      .catch(function (error) {
        next(error)
      })
  })

  post('/' + PROBATION + '/:organisationLevel/:id/update-reduction-status', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const reductionStatus = req.body.status
    const id = req.params.id
    const reductionId = req.body.reductionId

    if (!requestStatusVerified(reductionStatus)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions')
    }

    let successType
    if (reductionStatus === reductionStatusType.ARCHIVED) {
      successType = '?archived=true'
    } else if (reductionStatus === reductionStatusType.DELETED) {
      successType = '?deleted=true'
    }

    return reductionsService.getOldReductionForHistory(reductionId).then(function (oldReduction) {
      return reductionsService.addOldReductionToHistory(oldReduction).then(function () {
        return reductionsService.updateReductionStatus(id, reductionId, reductionStatus, oldReduction, res.locals.user.email)
          .then(function () {
            return res.redirect(302, '/' + PROBATION + '/' + organisationLevel + '/' + id + '/reductions' + successType)
          }).catch(function (error) {
            next(error)
          })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  const getStatusText = function (request) {
    let successText = null
    if (request.query.success) {
      successText = 'You have successfully added a new reduction!'
    } else if (request.query.edited) {
      successText = 'You have successfully updated the reduction!'
    } else if (request.query.archived) {
      successText = 'You have successfully archived the reduction!'
    } else if (request.query.deleted) {
      successText = 'You have successfully deleted the reduction!'
    }
    return successText
  }

  const generateNewReductionFromRequest = function (requestBody, reductionReason, submitterId) {
    const reductionStartDate = [requestBody.redStartDay, requestBody.redStartMonth, requestBody.redStartYear]
    const reductionEndDate = [requestBody.redEndDay, requestBody.redEndMonth, requestBody.redEndYear]
    const reasonId = requestBody.reasonForReductionId
    return new Reduction(reasonId, requestBody.reductionHours, reductionStartDate, reductionEndDate, requestBody.notes, reductionReason, submitterId)
  }

  const requestStatusVerified = function (reductionStatus) {
    let result = true

    const status = [
      reductionStatusType.ACTIVE,
      reductionStatusType.SCHEDULED,
      reductionStatusType.ARCHIVED,
      reductionStatusType.DELETED
    ]

    if (!status.includes(reductionStatus)) {
      result = false
    }

    return result
  }

  const mapReductionToViewModel = function (reduction) {
    let viewModel
    if (reduction !== undefined) {
      viewModel = {
        id: reduction.id,
        reasonId: reduction.reductionReasonId,
        hours: reduction.hours,
        start_day: reduction.reductionStartDate.getDate(),
        start_month: reduction.reductionStartDate.getMonth() + 1,
        start_year: reduction.reductionStartDate.getFullYear(),
        end_day: reduction.reductionEndDate.getDate(),
        end_month: reduction.reductionEndDate.getMonth() + 1,
        end_year: reduction.reductionEndDate.getFullYear(),
        notes: reduction.notes,
        status: reduction.status,
        isEnabled: reduction.isEnabled
      }
    }
    return viewModel
  }

  const renderReductionsMainPage = function (req, res, results, successText, id, organisationLevel, error = null) {
    const subNav = getSubNav(id, organisationLevel, req.path, PROBATION)
    const displayJson = {
      breadcrumbs: results.breadcrumbs,
      linkId: id,
      title: results.title,
      subTitle: results.subTitle,
      tabTitle: getTabTitle(results.title, results.subTitle, subNav, organisationLevel),
      subNav,
      activeReductions: results.activeReductions,
      scheduledReductions: results.scheduledReductions,
      archivedReductions: results.archivedReductions,
      successText,

      date: results.date,
      onOffenderManager: true

    }
    if (error) {
      displayJson.errors = error.validationErrors
    }
    return res.render('reductions', displayJson)
  }

  const stringifyReductionsData = function (reductionsRefData) {
    const reductionsData = Object.assign([], reductionsRefData)
    return JSON.stringify(reductionsData)
  }
}
