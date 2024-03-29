const getCapacityView = require('../services/get-capacity-view')
const getOutstandingReports = require('../services/get-outstanding-reports')
const getCaseDetailsReports = require('../services/data/get-case-details-reports-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const ValidationError = require('../services/errors/validation-error')
const { Forbidden } = require('../services/errors/authentication-error')
const messages = require('../constants/messages')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../../app/constants/workload-type')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const tierHelper = require('../services/helpers/tier-helper')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getCaseDetailsView = require('../services/get-case-details-view')
const getBreadcrumbs = require('../services/get-breadcrumbs')
const { SUPER_USER, MANAGER, STAFF } = require('../constants/user-roles')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated
const canExportOutstandingRoles = [SUPER_USER, MANAGER, STAFF]

module.exports = function (get, post) {
  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    return renderView(req, res, next, req.query)
  })

  post('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    return renderView(req, res, next, req.body)
  })

  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/capacity/outstanding-csv', function (req, res, next) {
    try {
      authorisation.hasRole(req, canExportOutstandingRoles)
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED
        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    if (organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for a team')
    }

    return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
      return getCaseDetailsReports(id, organisationLevel).then(function (caseDetails) {
        const formatedCaseDetails = formatCaseDetailsForExport(caseDetails)
        const result = {
          title: breadcrumbs[0].title,
          inactiveCaseDetails: formatedCaseDetails
        }
        const exportCsv = getExportCsv(organisationLevel, result, tabs.CAPACITY.INACTIVE)
        res.attachment(exportCsv.filename)
        return res.send(exportCsv.csv)
      }).catch(function (error) {
        next(error)
      })
    })
  })
}

const renderView = function (req, res, next, dateParameters) {
  let capacityDateRange
  let errors

  try {
    capacityDateRange = dateRangeHelper.createCapacityDateRange(dateParameters)
  } catch (error) {
    if (error instanceof ValidationError) {
      errors = error.validationErrors
      capacityDateRange = dateRangeHelper.createCapacityDateRange({})
    } else {
      throw error
    }
  }

  const organisationLevel = req.params.organisationLevel
  let id

  if (organisationLevel !== organisationUnit.NATIONAL.name) {
    id = req.params.id
  }

  const orgUnit = getOrganisationUnit('name', organisationLevel)
  let childOrgUnitDisplayText
  if (organisationLevel !== organisationUnit.OFFENDER_MANAGER.name) {
    childOrgUnitDisplayText = getOrganisationUnit('name', orgUnit.childOrganisationLevel).displayText
  }

  const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
  return Promise.all([getCapacityView(id, capacityDateRange, organisationLevel), getOutstandingReports(id, organisationLevel), getCaseDetailsView(id, organisationLevel)]).then(function ([capacityBreakdown, outstandingReports, caseDetails]) {
    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
      return res.render('capacity', {
        screen: 'capacity',
        linkId: id,
        title: capacityBreakdown.title,
        subTitle: capacityBreakdown.subTitle,
        tabTitle: getTabTitle(capacityBreakdown.title, capacityBreakdown.subTitle, subNav, organisationLevel),
        subNav,
        breadcrumbs: capacityBreakdown.breadcrumbs,
        capacity: capacityBreakdown.capacityTable,
        stringifiedCapacity: stringifyCapacityData(capacityBreakdown.capacityTable),
        errors,
        capacityBreakdown: capacityBreakdown.capacityBreakdown,
        capacityBreakdownTotals: capacityBreakdown.capacityBreakdownTotals,
        outstandingReports: outstandingReports.result,
        outstandingReportsTotals: outstandingReports.totals,
        caseDetails,
        childOrganisationLevel: orgUnit.childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrgUnitDisplayText,
        organisationLevel,
        date: lastUpdated,
        canExportOutstanding: canExportOutstandingRoles.includes(req.user.user_role),
        workloadType: workloadTypes.PROBATION,
        onOffenderManager: true
      })
    })
  }).catch(function (error) {
    next(error)
  })
}

const formatCaseDetailsForExport = function (caseDetails) {
  const result = []
  caseDetails.forEach(function (caseDetail) {
    const caseType = getCaseTypeDescription(caseDetail.inactiveCaseType)
    const tier = tierHelper.getTierType(caseDetail.tierNumber)
    const formattedCaseDetails = {
      lduName: caseDetail.lduDescription,
      teamName: caseDetail.teamDescription,
      name: caseDetail.name,
      gradeCode: caseDetail.grade,
      inactiveCaseType: caseType,
      crn: caseDetail.caseRefNumber,
      location: caseDetail.location,
      tier
    }
    result.push(formattedCaseDetails)
  })
  return result
}

const getCaseTypeDescription = function (inactiveCaseType) {
  let description
  switch (inactiveCaseType) {
    case 'U':
      description = 'Unpaid Work'
      break
    case 'O':
      description = 'Overdue Terminations'
      break
    case 'W':
      description = 'Active Warrants'
      break
    case 'S':
      description = 'Suspended Sentence Orders'
      break
    case 'L':
      description = 'Suspended Lifers'
      break
  }
  return description
}

const stringifyCapacityData = function (capacity) {
  const capacityData = Object.assign({}, capacity)
  return JSON.stringify(capacityData)
}
