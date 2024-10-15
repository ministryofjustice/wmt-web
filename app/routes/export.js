const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getCMSExport = require('../services/data/get-cms-export')
const getCaseDetailsExport = require('../services/data/get-case-details-export')
const getSuspendedLifersExport = require('../services/data/get-suspended-lifers-export')
const getT2aDetailExport = require('../services/data/get-t2a-detail-export')
const getWorkloadPercentageBreakdown = require('../services/data/get-workload-percentage-breakdown')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const getExpiringReductions = require('../services/data/get-expiring-reductions-for-export')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const { SUPER_USER, APPLICATION_SUPPORT, MANAGER } = require('../constants/user-roles')
const messages = require('../constants/messages')
const canExportRoles = [SUPER_USER, MANAGER]
const getTabTitle = require('../services/get-tab-title')
const navTitleConstants = require('../services/nav-title')

let lastUpdated

module.exports = function (get, post) {
  get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.hasRole(req, [SUPER_USER, APPLICATION_SUPPORT, MANAGER])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (lastUpdatedDate) {
      lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
      return getExport(id, organisationLevel).then(function (result) {
        result.date = lastUpdated
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        return res.render('export', {
          organisationLevel,
          linkId: req.params.id,
          title: result.title,
          subTitle: navTitleConstants.OFFENDER_MANAGEMENT.displayText,
          tabTitle: getTabTitle(result.title, navTitleConstants.OFFENDER_MANAGEMENT.displayText, subNav, organisationLevel),
          breadcrumbs: result.breadcrumbs,
          subNav,
          date: result.date,
          canExport: canExportRoles.includes(authorisedUserRole.userRole),
          onOffenderManager: true

        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  post('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.hasRole(req, canExportRoles)
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const radioButton = req.body.radioInlineGroup

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')

      let tabType
      let exportPromise
      switch (radioButton) {
        case '1':
          exportPromise = getCaseDetailsExport(id, organisationLevel)
          tabType = tabs.EXPORT.CASE_DETAILS_EXPORT
          break
        case '2':
          exportPromise = getCMSExport(id, organisationLevel)
          tabType = tabs.EXPORT.CMS_EXPORT
          break
        case '3':
          // exportPromise = getScenarioExport(id, organisationLevel)
          break
        case '4':
          exportPromise = getSuspendedLifersExport(id, organisationLevel)
          tabType = tabs.EXPORT.SUSPENDED_LIFERS_EXPORT
          break
        case '5':
          exportPromise = getWorkloadPercentageBreakdown(id, organisationLevel)
          tabType = tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT
          break
        case '6':
          exportPromise = getT2aDetailExport(id, organisationLevel)
          tabType = tabs.EXPORT.T2A_EXPORT
          break
        case '7':
          exportPromise = getExpiringReductions(id, organisationLevel)
          tabType = tabs.EXPORT.EXPIRING_REDUCTIONS
          break
        default:
          exportPromise = Promise.resolve()
      }

      return exportPromise.then(function (results) {
        if (radioButton === '3') {
          const scenarioFileName = `${organisationLevel}_Scenario_${dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY')}.xlsx`
          results.write(scenarioFileName, res)
        } else {
          formatResults(results, tabType)
          result.date = lastUpdated
          results.title = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY')
          let dateFileName = null
          dateFileName = result.title
          const exportCsv = getExportCsv(dateFileName, results, tabType)
          res.attachment(exportCsv.filename)
          res.send(exportCsv.csv)
        }
      })
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatResults = function (results, tabType) {
  let newDate, year, month, dt
  if (tabType === tabs.EXPORT.CMS_EXPORT) {
    results.forEach(function (result) {
      newDate = new Date(result.contactDate)
      year = newDate.getFullYear()
      month = newDate.getMonth() + 1
      dt = newDate.getDate()

      result.contactDate = dt + '-' + month + '-' + year
    })
  }
  return results
}
