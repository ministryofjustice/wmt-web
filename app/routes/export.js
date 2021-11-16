const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getArmsExport = require('../services/data/get-arms-export')
const getCMSExport = require('../services/data/get-cms-export')
const getCaseDetailsExport = require('../services/data/get-case-details-export')
const getSuspendedLifersExport = require('../services/data/get-suspended-lifers-export')
const getGroupSupervisionExport = require('../services/data/get-group-supervision-export')
const getT2aDetailExport = require('../services/data/get-t2a-detail-export')
const getScenarioExport = require('../services/get-scenario')
const getWorkloadPercentageBreakdown = require('../services/data/get-workload-percentage-breakdown')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const getExpiringReductions = require('../services/data/get-expiring-reductions-for-export')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const roles = require('../constants/user-roles')
const messages = require('../constants/messages')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
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
      const result = getExport(id, organisationLevel)
      result.date = lastUpdated
      return res.render('export', {
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
        date: result.date,
        canExportReductions: [roles.APPLICATION_SUPPORT, roles.SUPER_USER, roles.MANAGER].includes(authorisedUserRole.userRole)

      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id
    let exportPromise

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const radioButton = req.body.radioInlineGroup
    let tabType

    if (radioButton === '9') {
      try {
        authorisation.assertUserAuthenticated(req)
        authorisation.hasRole(req, [roles.SUPER_USER, roles.MANAGER])
      } catch (error) {
        if (error instanceof Unauthorized) {
          return res.status(error.statusCode).redirect(error.redirect)
        } else if (error instanceof Forbidden) {
          return res.status(error.statusCode).render(error.redirect, {
            heading: messages.ACCESS_DENIED,
            message: messages.MANAGER_ROLES_REQUIRED
          })
        } else {
          throw error
        }
      }
    }

    switch (radioButton) {
      case '1':
        exportPromise = getArmsExport(id, organisationLevel)
        tabType = tabs.EXPORT.ARMS_EXPORT
        break
      case '2':
        exportPromise = getCaseDetailsExport(id, organisationLevel)
        tabType = tabs.EXPORT.CASE_DETAILS_EXPORT
        break
      case '3':
        exportPromise = getCMSExport(id, organisationLevel)
        tabType = tabs.EXPORT.CMS_EXPORT
        break
      case '4':
        exportPromise = getGroupSupervisionExport(id, organisationLevel)
        tabType = tabs.EXPORT.GROUP_SUPERVISION_EXPORT
        break
      case '5':
        exportPromise = getScenarioExport(id, organisationLevel)
        break
      case '6':
        exportPromise = getSuspendedLifersExport(id, organisationLevel)
        tabType = tabs.EXPORT.SUSPENDED_LIFERS_EXPORT
        break
      case '7':
        exportPromise = getWorkloadPercentageBreakdown(id, organisationLevel)
        tabType = tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT
        break
      case '8':
        exportPromise = getT2aDetailExport(id, organisationLevel)
        tabType = tabs.EXPORT.T2A_EXPORT
        break
      case '9':
        exportPromise = getExpiringReductions(id, organisationLevel)
        tabType = tabs.EXPORT.EXPIRING_REDUCTIONS
        break
      default:
        exportPromise = Promise.resolve()
    }

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return exportPromise.then(function (results) {
        if (radioButton === '5') {
          const scenarioFileName = `BETA-${organisationLevel}_Scenario_${dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY')}.xlsx`
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
  results.forEach(function (result) {
    if ((tabType === tabs.EXPORT.GROUP_SUPERVISION_EXPORT) || (tabType === tabs.EXPORT.CMS_EXPORT)) {
      newDate = new Date(result.contactDate)
      year = newDate.getFullYear()
      month = newDate.getMonth() + 1
      dt = newDate.getDate()

      result.contactDate = dt + '-' + month + '-' + year
    }
  })
  return results
}
