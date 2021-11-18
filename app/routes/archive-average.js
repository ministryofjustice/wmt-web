const moment = require('moment')
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
const renderResults = require('../helpers/render-results')
const viewTemplate = 'averaged-caseload-data'
const title = 'Averaged Caseload Data'
const archiveDatabaseStartDateString = require('../../config').ARCHIVE_DATABASE_START_DATE
const currentDatabaseStartDateString = require('../../config').CURRENT_DATABASE_START_DATE
const heDecode = require('he')
const archiveDatabaseStartDate = new moment(archiveDatabaseStartDateString, 'DD/MM/YYYY') //eslint-disable-line
const currentDatabaseStartDate = new moment(currentDatabaseStartDateString, 'DD/MM/YYYY') //eslint-disable-line
const getGroupedAveragedArchiveData = require('../services/get-grouped-averaged-archive-data')
const getArchiveOption = require('../helpers/archive-helpers/get-archive-option')
const getStringifiedBody = require('../helpers/archive-helpers/get-stringified-body')
const createSearchListArray = require('../helpers/archive-helpers/create-search-list-array')
let archiveDataForm

module.exports = function (router) {
  router.get('/archive-data/average-caseload-data', function (req, res, next) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return renderResults(viewTemplate, title, res, null, null, authorisedUserRole)
  })

  router.post('/archive-data/average-caseload-data', function (req, res, next) {
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
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const multiSearchField = createSearchListArray(req.body['multi-search-field'])
    const stringifiedBody = getStringifiedBody(req.body, multiSearchField)
    const groupBy = heDecode.decode(req.body.groupBy)
    const interval = heDecode.decode(req.body.interval)

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
        return renderResults(viewTemplate, title, res, error.validationErrors, null, authorisedUserRole, archiveDataForm, req.body, null, stringifiedBody, groupBy, interval)
      } else {
        throw error
      }
    }

    const thisArchiveOption = getArchiveOption(archiveDataForm.archiveFromDate, archiveDatabaseStartDate, currentDatabaseStartDate)

    return getArchive(thisArchiveOption, archiveDataForm).then(function (results) {
      results = getGroupedArchiveData(results, groupBy, interval)
      return renderResults(viewTemplate, title, res, null, results, authorisedUserRole, archiveDataForm, req.body, null, stringifiedBody, groupBy, interval)
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/archive-data/average-caseload-data/archive-csv', function (req, res, next) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const multiSearchField = createSearchListArray(req.body['multi-search-field'])
    const stringifiedBody = getStringifiedBody(req.body, multiSearchField)
    const groupBy = heDecode.decode(req.body.groupBy)
    const interval = heDecode.decode(req.body.interval)

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
        return renderResults(viewTemplate, title, res, error.validationErrors, null, authorisedUserRole, archiveDataForm, req.body, null, stringifiedBody, groupBy, interval)
      } else {
        throw error
      }
    }

    const thisArchiveOption = getArchiveOption(archiveDataForm.archiveFromDate, archiveDatabaseStartDate, currentDatabaseStartDate)

    return getArchive(thisArchiveOption, archiveDataForm).then(function (results) {
      results = getGroupedArchiveData(results, groupBy, interval)
      let dateFileName = null
      if (archiveDataForm !== null) {
        dateFileName = archiveDataForm.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDataForm.archiveToDate.toISOString().substring(0, 10)
      }
      let tab
      if (groupBy === 'offenderManager') {
        tab = tabs.ADMIN.GROUPED_ARCHIVE
      } else {
        tab = tabs.ADMIN.GROUPED_ARCHIVE_TEAM
      }
      const exportCsv = getExportCsv(dateFileName, results, tab)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatResults = function (results) {
  results.forEach(function (result) {
    if (result.hoursReduction !== null) {
      result.hoursReduction = Number(result.hoursReduction.toFixed(1))
    } else {
      result.hoursReduction = 0
    }
  })
  return results
}

const getGroupedArchiveData = function (results, groupBy, interval) {
  if (results.length > 0) {
    results = formatResults(results)
    results = results.sort((a, b) => new moment(a.workloadDate).format('YYYYMMDD') - new moment(b.workloadDate).format('YYYYMMDD')) //eslint-disable-line
    let endDate = moment(results[results.length - 1].workloadDate).endOf('week').add(1, 'day').startOf('day')
    if (endDate.isBefore(archiveDataForm.archiveToDate)) {
      endDate = endDate.format('YYYY-MM-DD')
    } else {
      endDate = archiveDataForm.archiveToDate.format('YYYY-MM-DD')
    }
    results = getGroupedAveragedArchiveData(results, archiveDataForm.archiveFromDate, endDate, groupBy, interval)
  }
  return results
}
