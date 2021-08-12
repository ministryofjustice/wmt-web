const getCourtReportOverview = require('./data/get-court-report-overview')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const workloadTypeConst = require('../constants/workload-type')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getCourtReportOverview(id, organisationLevel)
    .then(function (courtReportOverview) {
      return getBreadcrumbs(id, organisationLevel, workloadTypeConst.COURT_REPORTS).then(function (breadcrumbs) {
        result.breadcrumbs = breadcrumbs
        result.overviewDetails = courtReportOverview
        result.title = result.breadcrumbs[0].title
        result.subTitle = organisationalUnitType.displayText
        return result
      })
    })
}
