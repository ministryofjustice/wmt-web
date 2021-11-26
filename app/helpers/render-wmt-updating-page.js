const moment = require('moment')
const log = require('../logger')

module.exports = function (res, importInProgress) {
  const ETA = moment(importInProgress.effective_from).add(30, 'minutes')
  const ETAPassed = moment().isAfter(ETA)
  if (ETAPassed) {
    log.error('ERROR: The ETL Process has exceeded the estimated completion time. Expected completion time was ' + ETA.format('h:mm a') + ' but it is now ' + moment().format('h:mm a'))
  }
  return res.render('etl_in_progress', {
    title: 'WMT Updating',
    subTitle: 'WMT Updating',
    ETA: ETA.format('h:mm a')
  })
}
