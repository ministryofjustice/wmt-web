const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const path = require('path')
const fs = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')

module.exports = function () {
  return courtReportsDataHelper.addCourtReportWorkloadsForOffenderManager()
    .then(function (courtReportInserts) {
      return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (workloadInserts) {
        try {
          fs.writeFileSync(pallyCourtInserts, JSON.stringify(courtReportInserts))
          fs.writeFileSync(pallyWorkloadInserts, JSON.stringify(workloadInserts))
        } catch (err) {
          console.error(err)
        }
        return {
          courtReportInserts,
          workloadInserts
        }
      })
    })
}
