const renderWMTUpdatingPage = require('../helpers/render-wmt-updating-page')
const getLatestProcessImportTask = require('../services/data/get-latest-process-import-task')

module.exports = function (req, res, next) {
  return getLatestProcessImportTask().then(function (importInProgress) {
    if (importInProgress) {
      return renderWMTUpdatingPage(res, importInProgress)
    }
    next()
  })
}
