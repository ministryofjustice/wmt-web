const getOmicOverview = require('../services/get-omic-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/overview', function (req, res, next) {
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/', function (req, res, next) {
    return renderOverview(req, res, next)
  })
}

const renderOverview = function (req, res, next) {
  const organisationLevel = req.params.organisationLevel
  const organisationUnit = getOrganisationUnit('name', organisationLevel)
  let id
  let childOrganisationLevel
  let childOrganisationLevelDisplayText

  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    } else {
      return next()
    }
  }

  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    childOrganisationLevel = organisationUnit.childOrganisationLevel
    childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
  }

  if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name || organisationLevel === organisationUnitConstants.TEAM.name) {
    throw new Error('Only available at National, Regional and Probation Delivery Unit level')
  }

  const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return getOmicOverview(id, organisationLevel).then(function (result) {
      result.date = lastUpdated
      const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.OMIC, authorisedUserRole.authorisation, authorisedUserRole.userRole)
      let subNavForTabTitle = null
      if (subNav?.length > 1) {
        subNavForTabTitle = subNav
      }
      return res.render('omic-overview', {
        title: result.title,
        subTitle: result.subTitle,
        tabTitle: getTabTitle(result.title, result.subTitle, subNavForTabTitle, organisationLevel),
        breadcrumbs: result.breadcrumbs,
        organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel,
        childOrganisationLevelDisplayText,
        subNav,
        overviewDetails: result.overviewDetails,
        date: result.date,

        workloadType: workloadTypes.OMIC,
        onOmic: true
      })
    })
  }).catch(function (error) {
    next(error)
  })
}
