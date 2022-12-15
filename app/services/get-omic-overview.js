const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getOrganisationOverview = require('./data/get-organisation-overview')
const { calculateOmicOverview } = require('./helpers/calculate-overview-values')
const { OMIC } = require('../constants/workload-type')
const navTitleConstants = require('./nav-title')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getBreadcrumbs(id, organisationLevel, OMIC).then(function (breadcrumbs) {
    result.breadcrumbs = breadcrumbs
    return getOrganisationOverview(id, organisationLevel, OMIC)
      .then(function (results) {
        result.overviewDetails = calculateOmicOverview(results)
        result.title = result.breadcrumbs[0].title
        if (organisationalUnitType.name === 'hmpps') {
          result.title = organisationalUnitType.displayText
        }
        result.subTitle = navTitleConstants.OMIC.subTitleText
        return result
      })
  })
}
