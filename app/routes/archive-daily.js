const moment = require('moment')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getArchive = require('../services/archive-service')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const ValidationError = require('../services/errors/validation-error')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const dateFormatter = require('../services/date-formatter')
const archiveOptions = require('../constants/archive-options')
const renderResults = require('../helpers/render-results')
const viewTemplate = 'daily-caseload-data'
const title = 'Archived Daily Caseload Data'
const archiveDatabaseStartDateString = require('../../config').ARCHIVE_DATABASE_START_DATE
const currentDatabaseStartDateString = require('../../config').CURRENT_DATABASE_START_DATE
const heDecode = require('he')
const archiveDatabaseStartDate = new moment(archiveDatabaseStartDateString, 'DD/MM/YYYY')
const currentDatabaseStartDate = new moment(currentDatabaseStartDateString, 'DD/MM/YYYY')

let archiveDateRange

module.exports = function (router) {
  router.get('/archive-data/daily-caseload-data', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return renderResults(viewTemplate, title, res, null, null, authorisedUserRole)
  })

  router.post('/archive-data/daily-caseload-data', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    let errors

    try {
      archiveDateRange = dateRangeHelper.createDailyArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createDailyArchiveDateRange({})
      } else {
        throw error
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const extraCriteria = heDecode.decode(req.body['daily-multi-search-field-entry'])
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }

    // Assume that you need to start with the DB that contains the earliest database
    let thisArchiveOption = archiveOptions.LEGACY
    if (archiveDateRange.archiveFromDate.isSameOrAfter(archiveDatabaseStartDate)) {
      // Archive start date is after the last date for data in the legacy database so don't bother searching the legacy DB
      thisArchiveOption = archiveOptions.DAILY_ARCHIVE
    }
    if (archiveDateRange.archiveFromDate.isSameOrAfter(currentDatabaseStartDate)) {
      // Archive start date is after the last date for data in the new archive database so don't bother searching this DB either
      thisArchiveOption = archiveOptions.DAILY
    }

    return getArchive(thisArchiveOption, archiveDateRange, extraCriteria).then(function (results) {
      results = formatResults(results)
      return renderResults(viewTemplate, title, res, errors, results, authorisedUserRole, archiveDateRange, extraCriteria)
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/archive-data/daily-caseload-data/archive-csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    let errors

    try {
      archiveDateRange = dateRangeHelper.createDailyArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createDailyArchiveDateRange({})
      } else {
        throw error
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const extraCriteria = heDecode.decode(req.body['daily-multi-search-field-entry'])

    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }

    let thisArchiveOption = archiveOptions.LEGACY
    if (archiveDateRange.archiveFromDate.isSameOrAfter(archiveDatabaseStartDate)) {
      thisArchiveOption = archiveOptions.DAILY_ARCHIVE
    }
    if (archiveDateRange.archiveFromDate.isSameOrAfter(currentDatabaseStartDate)) {
      thisArchiveOption = archiveOptions.DAILY
    }

    return getArchive(thisArchiveOption, archiveDateRange, extraCriteria).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDateRange !== null) {
        dateFileName = archiveDateRange.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
      }
      const exportCsv = getExportCsv(dateFileName, results, tabs.ADMIN.DAILY_ARCHIVE)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatResults = function (results) {
  results.forEach(function (result) {
    result.workloadDate = dateFormatter.formatDate(result.workloadDate, 'DD-MM-YYYY')
  })
  return results
}
