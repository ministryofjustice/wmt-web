const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/case-progress', function (req, res, next) {
    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return getCaseProgress(id, organisationLevel).then(function (result) {
        let stringifiedCaseProgressList = Object.assign([], result.caseProgressList)
        stringifiedCaseProgressList = JSON.stringify(stringifiedCaseProgressList)
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        return res.render('case-progress', {
          title: result.title,
          subTitle: result.subTitle,
          tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
          breadcrumbs: result.breadcrumbs,
          subNav,
          caseProgressList: result.caseProgressList,
          stringifiedCaseProgressList,
          date: lastUpdated,
          workloadType: workloadTypes.PROBATION,
          organisationLevel,
          onOffenderManager: true
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
