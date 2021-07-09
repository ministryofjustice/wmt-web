const aggregatedDataHelper = require('../helpers/data/aggregated-data-helper')
const courtReportsDataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const path = require('path')
const { readFileSync } = require('fs')


const pallyCourtInserts = path.resolve(__dirname, '../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../pallyWorkloadInserts.json')

try {
  const courtReportInserts = JSON.parse(readFileSync(pallyCourtInserts, 'utf8'))
  const workloadInserts = JSON.parse(readFileSync(pallyWorkloadInserts, 'utf8'))

  aggregatedDataHelper.removeInsertedData(workloadInserts).then(function() {
    return courtReportsDataHelper.removeInsertedData(courtReportInserts).then(function() {
      console.log('all data cleaned up')
      process.exit(0)
    })
  })
} catch (err) {
  console.error(err)
}
