const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require('./user-role-helper')
const dailyArchiveDataHelper = require('./daily-archive-data-helper')
const path = require('path')
const { readFileSync } = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')
const pallyUserInserts = path.resolve(__dirname, '../../../pallyUserInserts.json')
const dailyArchiveInserts = path.resolve(__dirname, '../../../dailyArchiveInserts.json')

module.exports = function () {
  try {
    const courtReportInserts = JSON.parse(readFileSync(pallyCourtInserts, 'utf8'))
    const workloadInserts = JSON.parse(readFileSync(pallyWorkloadInserts, 'utf8'))
    const userInserts = JSON.parse(readFileSync(pallyUserInserts, 'utf8'))
    const archiveInserts = JSON.parse(readFileSync(dailyArchiveInserts, 'utf8'))

    return dailyArchiveDataHelper.deleteDailyArchiveByIds(archiveInserts[0].id).then(function () {
      return aggregatedDataHelper.deleteAllTasks().then(function () {
        return aggregatedDataHelper.removeInsertedData(workloadInserts).then(function () {
          return courtReportsDataHelper.removeInsertedData(courtReportInserts).then(function () {
            return userRoleHelper.removeInsertedData(userInserts).then(function () {
              console.log('all data cleaned up')
            })
          })
        })
      })
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
