const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require('./user-role-helper')
const { users } = require('../routes/authentication-helper')
const path = require('path')
const fs = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')
const pallyUserInserts = path.resolve(__dirname, '../../../pallyUserInserts.json')

module.exports = function () {
  return courtReportsDataHelper.addCourtReportWorkloadsForOffenderManager()
    .then(function (courtReportInserts) {
      return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (workloadInserts) {
        const promises = Object.entries(users).map(function ([, u]) {
          return userRoleHelper.addUserAndRole(u.username, u.roleId)
        })
        return Promise.all(promises).then(function (userInserts) {
          try {
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
}
