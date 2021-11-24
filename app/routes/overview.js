const getOverview = require('../services/get-overview')
const getReductionsExport = require('../services/get-reductions-export')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const roles = require('../constants/user-roles')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const messages = require('../constants/messages')
const asyncMiddleware = require('../middleware/asyncMiddleware')
let lastUpdated

module.exports = function (router) {
  const get = function (path, handler) {
    router.get(path, asyncMiddleware(handler))
  }

  get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    req.params.id = '0'
    req.params.organisationLevel = 'hmpps'
    return renderOverview(req, res, next)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/caseload-csv', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.MANAGER, roles.SUPER_USER, roles.STAFF])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id
    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    const isCSV = true
    return getOverview(id, organisationLevel, isCSV).then(function (result) {
      const exportCsv = getExportCsv(organisationLevel, result, tabs.OVERVIEW)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/reductions-csv', function (req, res, next) {
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
    const id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    } else if (organisationLevel === organisationUnitConstants.NATIONAL.name) {
      throw new Error('Not available at national level')
    }

    return getReductionsExport(id, organisationLevel).then(function (result) {
      const reductionsExportCsv = getExportCsv(organisationLevel, result, tabs.REDUCTIONS_EXPORT)
      res.attachment(reductionsExportCsv.filename)
      res.send(reductionsExportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

const renderOverview = function (req, res, next) {
  const organisationLevel = req.params.organisationLevel
  const organisationUnit = getOrganisationUnit('name', organisationLevel)
  let id
  let childOrganisationLevel
  let childOrganisationLevelDisplayText

  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    } else {
      return next()
    }
  }

  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    childOrganisationLevel = organisationUnit.childOrganisationLevel
    childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
  }

  const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return getOverview(id, organisationLevel).then(function (result) {
      result.date = lastUpdated
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
        overviewDetails: result.overviewDetails,
        date: result.date,

        workloadType: workloadTypes.PROBATION
      })
    })
  }).catch(function (error) {
    next(error)
  })
}
