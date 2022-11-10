const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getDashboardFiles = require('../services/data/get-dashboard-files')
const getDashboardFile = require('../services/data/get-dashboard-file')
const roles = require('../constants/user-roles')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const messages = require('../constants/messages')
const getTabTitle = require('../services/get-tab-title')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/dashboard', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER, roles.APPLICATION_SUPPORT, roles.MANAGER])
    } catch (error) {
      if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      throw new Error('Only available for National Level')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (lastUpdatedDate) {
      lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
      const result = getExport(id, organisationLevel)
      result.date = lastUpdated
      return getDashboardFiles().then(function (dashboardFiles) {
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        return res.render('dashboard', {
          organisationLevel,
          dashboardFiles,
          linkId: req.params.id,
          title: result.title,
          subTitle: result.subTitle,
          tabTitle: getTabTitle(result.title, result.subTitle, subNav, organisationLevel),
          breadcrumbs: result.breadcrumbs,
          subNav,
          date: result.date,
          onOffenderManager: true

        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/dashboard/download', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER, roles.APPLICATION_SUPPORT, roles.MANAGER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    const organisationLevel = req.params.organisationLevel
    const fileId = req.query.id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      throw new Error('Only available for National Level')
    }
    return getDashboardFile(fileId).then(function (dataStream) {
      res.set('Content-disposition', `attachment; filename=${fileId}`)
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      dataStream.pipe(res)
    }).catch(function (error) {
      next(error)
    })
  })
}
