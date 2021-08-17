const moment = require('moment')
const minutesToRoundTo = 15 // Rounding up to next 1/4 hour
const log = require('../logger')

module.exports = function (res, importInProgress) {
  const ETAMinutes = moment(importInProgress.effective_from).format('mm')
  const minutesToAdd = minutesToRoundTo - (parseInt(ETAMinutes) % minutesToRoundTo)
  const ETA = moment(importInProgress.effective_from).add(90, 'minutes').add(minutesToAdd, 'minutes')
  const ETAPassed = moment().isAfter(ETA)
  if (ETAPassed) {
    log.error('ERROR: The ETL Process has Exceeded the Estimated Completion Time. Expected completion time was ' + ETA.format('h:mm a') + ' but it is now ' + moment().format('h:mm a'))
  }
  return res.render('etl_in_progress', {
    title: 'WMT Updating',
    subTitle: 'WMT Updating',
    ETA: ETA.format('h:mm a')
  })
}
