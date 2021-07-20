const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const path = require('path')
const { readFileSync } = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')

module.exports = function () {
  try {
    const courtReportInserts = JSON.parse(readFileSync(pallyCourtInserts, 'utf8'))
    const workloadInserts = JSON.parse(readFileSync(pallyWorkloadInserts, 'utf8'))
    return aggregatedDataHelper.deleteAllTasks().then(function () {
      return aggregatedDataHelper.removeInsertedData(workloadInserts).then(function () {
        return courtReportsDataHelper.removeInsertedData(courtReportInserts).then(function () {
          console.log('all data cleaned up')
        })
      })
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
