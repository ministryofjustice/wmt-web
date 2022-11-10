const organisationUnitConstants = require('../constants/organisation-unit')

module.exports = function (pageTitle, pageSubTitle, subNav, organisationLevel) {
  let selectedSubNavTitle = null
  subNav?.forEach(function (item) {
    if (item.active) {
      selectedSubNavTitle = item.title
    }
  })

  let selectedAreaTitle = pageTitle
  if (organisationLevel === organisationUnitConstants.NATIONAL.name) {
    selectedAreaTitle = 'National'
  }

  return {
    first: selectedAreaTitle,
    second: selectedSubNavTitle,
    third: pageSubTitle
  }
}
