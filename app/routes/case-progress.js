const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')

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
        result.date = lastUpdated
        let crcCaseProgressList = Object.assign([], result.caseProgressList)
        let stringifiedCRCCaseProgressList = '[]'
        if (organisationLevel === organisationUnit.NATIONAL.name) {
          crcCaseProgressList = crcCaseProgressList.filter(c => c.name.includes('CPA '))
          result.caseProgressList = result.caseProgressList.filter(c => !c.name.includes('CPA '))
          stringifiedCRCCaseProgressList = Object.assign([], crcCaseProgressList)
          stringifiedCRCCaseProgressList = JSON.stringify(stringifiedCRCCaseProgressList)
        } else {
          crcCaseProgressList = []
        }
        let stringifiedCaseProgressList = Object.assign([], result.caseProgressList)
        stringifiedCaseProgressList = JSON.stringify(stringifiedCaseProgressList)
        return res.render('case-progress', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          caseProgressList: result.caseProgressList,
          stringifiedCaseProgressList: stringifiedCaseProgressList,
          crcCaseProgressList: crcCaseProgressList,
          stringifiedCRCCaseProgressList: stringifiedCRCCaseProgressList,
          date: result.date,
          workloadType: workloadTypes.PROBATION,
          organisationLevel: organisationLevel
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
