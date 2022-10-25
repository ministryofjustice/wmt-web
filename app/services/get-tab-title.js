const organisationUnitConstants = require('../constants/organisation-unit')

module.exports = function (pageTitle, subNav, organisationLevel) {
  let selectedSubNavTitle = ''
  subNav.forEach(function (item) {
    if (item.active) {
      selectedSubNavTitle = item.title
    }
  })

  let selectedAreaTitle = pageTitle
  if (organisationLevel === organisationUnitConstants.NATIONAL.name) {
    selectedAreaTitle = 'National'
  }

  return {
    first: selectedSubNavTitle,
    second: selectedAreaTitle,
    third: 'HMPPS'
  }
}
