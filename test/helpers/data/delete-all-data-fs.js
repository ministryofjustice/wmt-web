const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require('./user-role-helper')
const dailyArchiveDataHelper = require('./daily-archive-data-helper')
const path = require('path')
const { readFileSync } = require('fs')

const testCourtInserts = path.resolve(__dirname, '../../testDataCourtInserts.json')
const testWorkloadInserts = path.resolve(__dirname, '../../testDataWorkloadInserts.json')
const testUserInserts = path.resolve(__dirname, '../../testDataUserInserts.json')
const dailyArchiveInserts = path.resolve(__dirname, '../../testDataDailyArchiveInserts.json')

module.exports = function () {
  try {
    const courtReportInserts = JSON.parse(readFileSync(testCourtInserts, 'utf8'))
    const workloadInserts = JSON.parse(readFileSync(testWorkloadInserts, 'utf8'))
    const userInserts = JSON.parse(readFileSync(testUserInserts, 'utf8'))
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
  } catch (e) {
    // Do nothing - assume the files are missing
    return Promise.resolve()
  }
}
