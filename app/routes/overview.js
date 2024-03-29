const getOverview = require('../services/get-overview')
const getIndividualOverview = require('../services/get-individual-overview')
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
const getTabTitle = require('../services/get-tab-title')
const navTitleConstants = require('../services/nav-title')

let lastUpdated

module.exports = function (get) {
  get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    req.params.id = '0'
    req.params.organisationLevel = 'hmpps'
    return renderOverview(req, res, next)
  })

  get(`/${workloadTypes.PROBATION}/${organisationUnitConstants.OFFENDER_MANAGER.name}/:id/overview`, function (req, res, next) {
    if (req.params.id === undefined || isNaN(parseInt(req.params.id, 10))) {
      return next()
    }
    return getLastUpdated().then(function (result) {
      const lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
      return getIndividualOverview(req.params.id, workloadTypes.PROBATION).then(function (result) {
        const subNav = getSubNav(req.params.id, organisationUnitConstants.OFFENDER_MANAGER.name, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        return res.render('individual-overview', {
          title: result.title,
          subTitle: navTitleConstants.OFFENDER_MANAGEMENT.displayText,
          tabTitle: getTabTitle(result.title, navTitleConstants.OFFENDER_MANAGEMENT.displayText, subNav, organisationUnitConstants.OFFENDER_MANAGER.name),
          breadcrumbs: result.breadcrumbs,
          organisationLevel: organisationUnitConstants.OFFENDER_MANAGER.name,
          subNav,
          overviewDetails: result.overviewDetails,
          date: lastUpdated,
          onOffenderManager: true
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  get(`/${workloadTypes.PROBATION}/${organisationUnitConstants.OFFENDER_MANAGER.name}/:id/`, function (req, res, next) {
    if (req.params.id === undefined || isNaN(parseInt(req.params.id, 10))) {
      return next()
    }
    return getLastUpdated().then(function (result) {
      const lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
      return getIndividualOverview(req.params.id, workloadTypes.PROBATION).then(function (result) {
        const subNav = getSubNav(req.params.id, organisationUnitConstants.OFFENDER_MANAGER.name, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        return res.render('individual-overview', {
          title: result.title,
          subTitle: navTitleConstants.OFFENDER_MANAGEMENT.displayText,
          tabTitle: getTabTitle(result.title, navTitleConstants.OFFENDER_MANAGEMENT.displayText, subNav, organisationUnitConstants.OFFENDER_MANAGER.name),
          breadcrumbs: result.breadcrumbs,
          organisationLevel: organisationUnitConstants.OFFENDER_MANAGER.name,
          subNav,
          overviewDetails: result.overviewDetails,
          date: lastUpdated,
          onOffenderManager: true
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/caseload-csv', function (req, res, next) {
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
    let id
    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    return getOverview(id, organisationLevel, true).then(function (result) {
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
  const childOrganisationLevel = organisationUnit.childOrganisationLevel
  const childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText

  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    } else {
      return next()
    }
  }

  const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return getOverview(id, organisationLevel).then(function (result) {
      const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
      const showExportOverview = res.locals.canExportOverview &&
        (organisationLevel === organisationUnitConstants.NATIONAL.name ||
          organisationLevel === organisationUnitConstants.REGION.name ||
          organisationLevel === organisationUnitConstants.LDU.name ||
          organisationLevel === organisationUnitConstants.TEAM.name)
      const showExportReductions = res.locals.canExportReductions &&
        (organisationLevel === organisationUnitConstants.REGION.name ||
          organisationLevel === organisationUnitConstants.LDU.name ||
          organisationLevel === organisationUnitConstants.TEAM.name)
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        tabTitle: getTabTitle(result.title, navTitleConstants.OFFENDER_MANAGEMENT.displayText, subNav, organisationLevel),
        breadcrumbs: result.breadcrumbs,
        organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel,
        childOrganisationLevelDisplayText,
        subNav,
        overviewDetails: result.overviewDetails,
        date: lastUpdated,
        workloadType: workloadTypes.PROBATION,
        displayName: res.locals.displayName,
        allocations: res.locals.allocations,
        showExportOverview,
        showExportReductions,
        exportAreaTitle: result.title,
        exportOrganisationLevel: exportOrganisationLevelText(organisationLevel),
        onOffenderManager: true
      })
    })
  }).catch(function (error) {
    next(error)
  })
}

const exportOrganisationLevelText = function (organisationLevel) {
  if (organisationLevel === organisationUnitConstants.NATIONAL.name) {
    return 'national'
  }
  if (organisationLevel === organisationUnitConstants.REGION.name) {
    return 'regional'
  }
  if (organisationLevel === organisationUnitConstants.LDU.name) {
    return 'PDU'
  }
  if (organisationLevel === organisationUnitConstants.TEAM.name) {
    return 'team'
  }
  return ''
}
