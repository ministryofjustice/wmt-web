const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  return getBreadcrumbs(id, organisationLevel).then(function (breadcrumbs) {
    const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
    let title = breadcrumbs[0].title
    if (organisationalUnitType.name === 'hmpps') {
      title = organisationalUnitType.displayText
    }
    return {
      breadcrumbs,
      title
    }
  })
}
