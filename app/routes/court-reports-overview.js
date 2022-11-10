const getCourtReportOverview = require('../services/get-court-report-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadTypeConstants = require('../constants/workload-type')
const workloadTypes = require('../../app/constants/workload-type')
const authorisation = require('../authorisation')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.COURT_REPORTS + '/:organisationLevel/:id/overview', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.COURT_REPORTS + '/:organisationLevel/:id', function (req, res, next) {
    return renderOverview(req, res, next)
  })
}

const renderOverview = function (req, res, next) {
  const organisationLevel = req.params.organisationLevel
  const organisationUnit = getOrganisationUnit('name', organisationLevel)
  let id
  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    }
  }

  const childOrganisationLevel = organisationUnit.childOrganisationLevel
  const childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText

  const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return getCourtReportOverview(id, organisationLevel)
      .then(function (result) {
        result.date = lastUpdated
        result.overviewDetails.sort(function (a, b) { return a.name.localeCompare(b.name) })
        return res.render('court-reports-overview', {
          title: result.title,
          subTitle: result.subTitle,
          tabTitle: getTabTitle(result.title, result.subTitle, null, organisationLevel),
          breadcrumbs: result.breadcrumbs,
          organisationLevel,
          childOrganisationLevel,
          childOrganisationLevelDisplayText,
          subNav: getSubNav(id, organisationLevel, req.path, workloadTypeConstants.COURT_REPORTS, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          overviewDetails: result.overviewDetails,
          date: result.date,
          onCourtReports: true

        })
      }).catch(function (error) {
        next(error)
      })
  })
}
