const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getScenarioExport = require('../services/get-omic-scenario')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const { SUPER_USER, STAFF, MANAGER } = require('../constants/user-roles')
const messages = require('../constants/messages')
const canExportRoles = [SUPER_USER, MANAGER, STAFF]
const getTabTitle = require('../services/get-tab-title')
const navTitleConstants = require('../services/nav-title')

let lastUpdated

module.exports = function (get, post) {
  get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/export', function (req, res, next) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (lastUpdatedDate) {
      lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
      return getExport(id, organisationLevel).then(function (result) {
        result.date = lastUpdated
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.OMIC, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        const isRegionLevel = organisationLevel === organisationUnit.REGION.name
        return res.render('omic-export', {
          organisationLevel,
          linkId: req.params.id,
          title: result.title,
          subTitle: navTitleConstants.OMIC.displayText,
          tabTitle: getTabTitle(result.title, navTitleConstants.OMIC.displayText, subNav, organisationLevel),
          breadcrumbs: result.breadcrumbs,
          subNav,
          isRegionLevel,
          date: result.date,
          onOmic: true
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  post('/' + workloadTypes.OMIC + '/:organisationLevel/:id/export', function (req, res, next) {
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
    let exportPromise

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const radioButton = req.body.radioInlineGroup
    const scenarioPromise = getScenarioExport(id, organisationLevel)

    switch (radioButton) {
      case '1':
        exportPromise = scenarioPromise
        break
      default:
        exportPromise = Promise.resolve()
    }

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return exportPromise.then(function (results) {
        if (radioButton === '1') {
          const scenarioFileName = organisationLevel + '_Scenario_' + dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY') + '.xlsx'
          results.write(scenarioFileName, res)
        }
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
