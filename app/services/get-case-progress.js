const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getCaseProgress = require('./data/get-caseload-progress')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseProgress(id, organisationLevel).then(function (results) {
    return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
      result.caseProgressList = results
      result.breadcrumbs = breadcrumbs
      result.title = result.breadcrumbs[0].title
      result.subTitle = organisationalUnitType.displayText
      result.caseProgressList.sort(function (a, b) { return b.name.localeCompare(a.name) }) // sorted backwards as the plot displays backwards, table is incorrect
      return result
    })
  })
}
