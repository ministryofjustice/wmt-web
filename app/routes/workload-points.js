const workloadPointsService = require('../services/workload-points-service')
const WorkloadPoints = require('../services/domain/workload-points')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const logger = require('../logger')
const getAdjustmentPointsConfig = require('../services/data/get-adjustment-points-config')
const updateAdjustmentPointsConfig = require('../services/data/update-adjustment-points-config')
const adjustmentTypes = require('../constants/adjustment-type')

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const success = req.query.success
    const successText = success ? 'You have successfully updated the workload points!' : null
    return workloadPointsService.getWorkloadPoints(false)
      .then(function (result) {
        return getAdjustmentPointsConfig(adjustmentTypes.CMS)
          .then(function (cms) {
            return getAdjustmentPointsConfig(adjustmentTypes.GS)
              .then(function (gs) {
                return res.render('workload-points', {
                  title: result.title,
                  subTitle: result.subTitle,
                  breadcrumbs: result.breadcrumbs,
                  wp: result.workloadPoints,
                  gs: gs,
                  cms: cms,
                  updatedBy: result.updatedBy,
                  successText: successText

                })
              })
          })
      })
  })

  router.get('/admin/workload-points/t2a', function (req, res) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const success = req.query.success
    const successText = success ? 'You have successfully updated the workload points for transition to adulthood cases!' : null

    return workloadPointsService.getWorkloadPoints(true)
      .then(function (result) {
        return res.render('workload-points', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          wp: result.workloadPoints,
          updatedBy: result.updatedBy,
          successText: successText

        })
      })
  })

  router.post('/admin/workload-points', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    let adjustmentsFromInput, updatedWorkloadPoints
    try {
      if (req.user && req.user.userId) {
        req.body.userId = req.user.userId.toString()
      } else {
        req.body.userId = '0'
      }
      adjustmentsFromInput = filterAdjustments('adjustment', req)
      updatedWorkloadPoints = new WorkloadPoints(req.body, adjustmentsFromInput)
      return workloadPointsService.updateWorkloadPoints(updatedWorkloadPoints, false)
        .then(function () {
          return getAdjustmentPointsConfig(adjustmentTypes.CMS)
            .then(function (cms) {
              return getAdjustmentPointsConfig(adjustmentTypes.GS)
                .then(function (gs) {
                  const cmsUpdated = updateAdjustmentObjects(cms, adjustmentsFromInput)
                  const gsUpdated = updateAdjustmentObjects(gs, adjustmentsFromInput)
                  const adjustmentUpdatePromises = []
                  cmsUpdated.forEach(function (cmsAdjustment) {
                    adjustmentUpdatePromises.push(updateAdjustmentPointsConfig(cmsAdjustment))
                  })
                  gsUpdated.forEach(function (gsAdjustment) {
                    adjustmentUpdatePromises.push(updateAdjustmentPointsConfig(gsAdjustment))
                  })
                  return Promise.all(adjustmentUpdatePromises)
                    .then(function () {
                      return res.redirect(302, '/admin/workload-points?success=true')
                    })
                })
            })
        })
    } catch (error) {
      logger.error(error)
      if (error instanceof ValidationError) {
        return workloadPointsService.getWorkloadPoints(false)
          .then(function (result) {
            return getAdjustmentPointsConfig(adjustmentTypes.CMS)
              .then(function (cms) {
                return getAdjustmentPointsConfig(adjustmentTypes.GS)
                  .then(function (gs) {
                    const cmsUpdated = updateAdjustmentObjects(cms, adjustmentsFromInput)
                    const gsUpdated = updateAdjustmentObjects(gs, adjustmentsFromInput)
                    return res.status(400).render('workload-points', {
                      title: result.title,
                      subTitle: result.subTitle,
                      breadcrumbs: result.breadcrumbs,
                      wp: req.body,
                      cms: cmsUpdated,
                      gs: gsUpdated,
                      updatedBy: result.updatedBy,
                      errors: error.validationErrors

                    })
                  })
              })
          })
      }
      next(error)
    }
  })

  router.post('/admin/workload-points/t2a', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    try {
      if (req.user) {
        req.body.userId = req.user.userId.toString()
      }
      const updatedT2aWorkloadPoints = new WorkloadPoints(req.body)
      return workloadPointsService.updateWorkloadPoints(updatedT2aWorkloadPoints, true)
        .then(function () {
          return res.redirect(302, '/admin/workload-points/t2a?success=true')
        })
    } catch (error) {
      logger.error(error)
      if (error instanceof ValidationError) {
        return workloadPointsService.getWorkloadPoints(true)
          .then(function (result) {
            return res.status(400).render('workload-points', {
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              wp: req.body,
              updatedBy: result.updatedBy,
              errors: error.validationErrors

            })
          })
      }
      next(error)
    }
  })
}

const filterAdjustments = function (prefix, req) {
  const object = {}
  Object.keys(req.body).forEach(function (key) {
    if (key.startsWith(prefix)) {
      object[key] = req.body[key]
    }
  })
  delete object[prefix + 'Count']
  return object
}

const updateAdjustmentObjects = function (adjDBObjects, adjUserInput) {
  adjDBObjects.forEach(function (adj) {
    adj.points = adjUserInput['adjustment' + adj.adjustmentId]
  })
  return adjDBObjects
}
