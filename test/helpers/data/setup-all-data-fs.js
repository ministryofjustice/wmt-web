const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require('./user-role-helper')
const dailyArchiveDataHelper = require('./daily-archive-data-helper')
const { users } = require('../routes/authentication-helper')
const path = require('path')
const fs = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')
const pallyUserInserts = path.resolve(__dirname, '../../../pallyUserInserts.json')
const dailyArchiveInserts = path.resolve(__dirname, '../../../dailyArchiveInserts.json')

const dailyArchiveData = {
  workloadID: 2745,
  workloadDate: '01 Jan 2015 00:00:00 GMT',
  lduName: 'Test LDU',
  regionName: 'NPS Test Region',
  teamName: 'Test Team',
  omName: 'Test_forename Test_surname',
  grade: 'PO',
  totalCases: 1,
  totalPoints: 6,
  sdrPoints: 0,
  sdrConversionPoints: 0,
  paromsPoints: 0,
  nominalTarget: 2171,
  contractedHours: 37,
  hoursReduction: 0
}

module.exports = function () {
  return dailyArchiveDataHelper.createDailyArchive(dailyArchiveData).then(function (dailyArchiveId) {
    const dailyArchiveIdInsert = [{ table: 'daily_archive_data', id: dailyArchiveId[0] }]
    return courtReportsDataHelper.addCourtReportWorkloadsForOffenderManager()
      .then(function (courtReportInserts) {
        return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (workloadInserts) {
          const promises = Object.entries(users).map(function ([, u]) {
            return userRoleHelper.addUserAndRole(u.username.toLowerCase(), u.roleId)
          })
          return Promise.all(promises).then(function (userInserts) {
            try {
              fs.writeFileSync(dailyArchiveInserts, JSON.stringify(dailyArchiveIdInsert))
              fs.writeFileSync(pallyCourtInserts, JSON.stringify(courtReportInserts))
              fs.writeFileSync(pallyWorkloadInserts, JSON.stringify(workloadInserts))
              fs.writeFileSync(pallyUserInserts, JSON.stringify(userInserts.reduce((acc, x) => acc.concat(x), [])))
            } catch (err) {
              console.error(err)
            }
            return {
              courtReportInserts,
              workloadInserts
            }
          })
        })
      })
  })
}
