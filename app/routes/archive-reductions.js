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
const archiveOptions = require('../constants/archive-options')
const renderResults = require('../helpers/render-results')
const viewTemplate = 'reduction-archive-data'
const title = 'Archived Reductions'
const heDecode = require('he')
const getReductionsHistory = require('../services/data/get-reductions-history')
const getStringifiedBody = require('../helpers/archive-helpers/get-stringified-body')
const createSearchListArray = require('../helpers/archive-helpers/create-search-list-array')

let archiveDataForm

module.exports = function (router) {
  router.get('/archive-data/reductions', function (req, res, next) {
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

    return renderResults(viewTemplate, title, res, null, null, req.user.user_role)
  })

  router.post('/archive-data/reductions', function (req, res, next) {
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
        multiSearchField,
        true
      )
    } catch (error) {
      if (error instanceof ValidationError) {
        return renderResults(viewTemplate, title, res, error.validationErrors, null, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
      } else {
        throw error
      }
    }

    return getArchive(archiveOptions.REDUCTIONS, archiveDataForm).then(function (results) {
      results = formatResults(results)
      if (results.length === 0) {
        return res.json({
          draw: 0,
          recordsTotal: 0,
          recordsFiltered: 0,
          reductions: results
        })
      }

      const offset = parseInt(req.body.start)
      const limit = parseInt(req.body.length)

      const reductions = results.slice(offset, Math.min(offset + limit, results.length))
      return res.json({
        draw: req.body.draw,
        recordsTotal: results.length,
        recordsFiltered: results.length,
        reductions: reductions
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/archive-data/reductions-search', function (req, res, next) {
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

    return res.redirect('/archive-data/reductions')
  })

  router.post('/archive-data/reductions-search', function (req, res, next) {
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
        multiSearchField,
        true
      )
    } catch (error) {
      if (error instanceof ValidationError) {
        return renderResults(viewTemplate, title, res, error.validationErrors, null, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
      } else {
        throw error
      }
    }
    return renderResults(viewTemplate, title, res, null, null, req.user.user_role, archiveDataForm, req.body, true, stringifiedBody)
  })

  router.post('/archive-data/reductions/archive-csv', function (req, res, next) {
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
        multiSearchField,
        true
      )
    } catch (error) {
      if (error instanceof ValidationError) {
        return renderResults(viewTemplate, title, res, error.validationErrors, null, req.user.user_role, archiveDataForm, req.body, null, stringifiedBody)
      } else {
        throw error
      }
    }

    return getArchive(archiveOptions.REDUCTIONS, archiveDataForm).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDataForm !== null) {
        dateFileName = archiveDataForm.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDataForm.archiveToDate.toISOString().substring(0, 10)
      }
      const exportCsv = getExportCsv(dateFileName, results, tabs.ADMIN.REDUCTION_ARCHIVE)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/archive-data/reductions-history', function (req, res, next) {
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

    const reductionId = heDecode.decode(req.body.reductionId)

    return getReductionsHistory(reductionId).then(function (reductionsHistory) {
      return res.json({
        reductionsHistory: reductionsHistory
      })
    })
  })
}

const formatResults = function (results) {
  results.forEach(function (result) {
    if (result.omName === null || result.omName === ' ') {
      result.omName = 'NO NAME FOR THIS REDUCTION'
    }
    if (result.lastUpdatedDate !== null) {
      result.lastUpdatedDate = dateFormatter.formatDate(result.lastUpdatedDate, 'DD/MM/YYYY')
    }
    if (result.startDate !== null && result.startDate !== 'N/A') {
      result.startDate = dateFormatter.formatDate(result.startDate, 'DD/MM/YYYY')
    }
    if (result.endDate !== null && result.endDate !== 'N/A') {
      result.endDate = dateFormatter.formatDate(result.endDate, 'DD/MM/YYYY')
    }
  })
  return results
}
