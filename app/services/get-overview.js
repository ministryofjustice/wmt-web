const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getOrganisationOverview = require('./data/get-organisation-overview')
const getFullOverview = require('./data/get-full-overview')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const workloadTypes = require('../constants/workload-type')

module.exports = function (id, organisationLevel, isCSV = false, workloadType = workloadTypes.PROBATION) {
  const result = {}
  let overviewPromise = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (isCSV) {
    overviewPromise = getFullOverview(id, organisationLevel, workloadType)
  } else {
    overviewPromise = getOrganisationOverview(id, organisationLevel, workloadType)
  }

  return getBreadcrumbs(id, organisationLevel, workloadType).then(function (breadcrumbs) {
    result.breadcrumbs = breadcrumbs
    return overviewPromise.then(function (results) {
      result.overviewDetails = calculateOverviewValues(results, isCSV, workloadType)
      result.title = result.breadcrumbs[0].title
      result.subTitle = organisationalUnitType.displayText
      return result
    })
  })
}
