const Moment = require('moment')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getArchive = require('../services/archive-service')
const ArchiveDataForm = require('../services/domain/archive-data-form')
const ValidationError = require('../services/errors/validation-error')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const dateFormatter = require('../services/date-formatter')
const renderResults = require('../helpers/render-results')
const viewTemplate = 'daily-caseload-data'
const title = 'Daily Caseload Data'
const archiveDatabaseStartDateString = require('../../config').ARCHIVE_DATABASE_START_DATE
const currentDatabaseStartDateString = require('../../config').CURRENT_DATABASE_START_DATE
const archiveDatabaseStartDate = new Moment(archiveDatabaseStartDateString, 'DD/MM/YYYY')  
const currentDatabaseStartDate = new Moment(currentDatabaseStartDateString, 'DD/MM/YYYY')  
const getArchiveOption = require('../helpers/archive-helpers/get-archive-option')
const getStringifiedBody = require('../helpers/archive-helpers/get-stringified-body')
const createSearchListArray = require('../helpers/archive-helpers/create-search-list-array')

let archiveDataForm

module.exports = function (get, post) {
  get('/archive-data/daily-caseload-data', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }
    return renderResults(viewTemplate, title, res, null, null, req.user.user_role)
  })

  post('/archive-data/daily-caseload-data', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER, roles.APPLICATION_SUPPORT])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const multiSearchField = createSearchListArray(req.body['multi-search-field'])
    const stringifiedBody = getStringifiedBody(req.body, multiSearchField)

    try {
      archiveDataForm = new ArchiveDataForm(
        req.body['archive-from-day'],
        req.body['archive-from-month'],
        req.body['archive-from-year'],
        req.body['archive-to-day'],
        req.body['archive-to-month'],
        req.body['archive-to-year'],
        multiSearchField
      )
    } catch (error) {
      if (error instanceof ValidationError) {
        return renderResults(viewTemplate, title, res, error.validationErrors, null, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
      } else {
        throw error
      }
    }

    const thisArchiveOption = getArchiveOption(archiveDataForm.archiveFromDate, archiveDatabaseStartDate, currentDatabaseStartDate)

    return getArchive(thisArchiveOption, archiveDataForm).then(function (results) {
      results = formatResults(results)
      return renderResults(viewTemplate, title, res, null, results, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
    }).catch(function (error) {
      next(error)
    })
  })

  post('/archive-data/daily-caseload-data/archive-csv', function (req, res, next) {
    try {
      authorisation.hasRole(req, [roles.SUPER_USER])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED

        })
      }
    }

    const multiSearchField = createSearchListArray(req.body['multi-search-field'])
    const stringifiedBody = getStringifiedBody(req.body, multiSearchField)

    try {
      archiveDataForm = new ArchiveDataForm(
        req.body['archive-from-day'],
        req.body['archive-from-month'],
        req.body['archive-from-year'],
        req.body['archive-to-day'],
        req.body['archive-to-month'],
        req.body['archive-to-year'],
        multiSearchField
      )
    } catch (error) {
      if (error instanceof ValidationError) {
        return renderResults(viewTemplate, title, res, error.validationErrors, null, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
      } else {
        throw error
      }
    }

    const thisArchiveOption = getArchiveOption(archiveDataForm.archiveFromDate, archiveDatabaseStartDate, currentDatabaseStartDate)

    return getArchive(thisArchiveOption, archiveDataForm).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDataForm !== null) {
        dateFileName = archiveDataForm.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDataForm.archiveToDate.toISOString().substring(0, 10)
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
    result.workloadDateSortBy = new Moment(result.workloadDate, 'DD-MM-YYYY').unix()
  })
  return results
}
