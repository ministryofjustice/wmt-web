const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
    const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
    return {
      breadcrumbs,
      title: breadcrumbs[0].title,
      subTitle: organisationalUnitType.displayText
    }
  })
}
