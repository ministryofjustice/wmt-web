const getCourtReportOverview = require('./data/get-court-report-overview')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const workloadTypeConst = require('../constants/workload-type')
const navTitleConstants = require('./nav-title')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getCourtReportOverview(id, organisationLevel)
    .then(function (courtReportOverview) {
      return getBreadcrumbs(id, organisationLevel, workloadTypeConst.COURT_REPORTS).then(function (breadcrumbs) {
        result.breadcrumbs = breadcrumbs
        result.overviewDetails = courtReportOverview
        result.title = result.breadcrumbs[0].title
        if (organisationalUnitType.name === 'hmpps') {
          result.title = organisationalUnitType.displayText
        }
        result.subTitle = navTitleConstants.COURT_REPORTS.displayText
        return result
      })
    })
}
