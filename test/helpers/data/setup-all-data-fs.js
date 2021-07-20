const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require ('./user-role-helper')
const {users} = require('../routes/authentication-helper')
const path = require('path')
const fs = require('fs')

const pallyCourtInserts = path.resolve(__dirname, '../../../pallyCourtInserts.json')
const pallyWorkloadInserts = path.resolve(__dirname, '../../../pallyWorkloadInserts.json')

module.exports = function () {
  return courtReportsDataHelper.addCourtReportWorkloadsForOffenderManager()
    .then(function (courtReportInserts) {
      return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (workloadInserts) {
        return Object.entries(users).forEach(function(u) {
          return userRoleHelper.addUserAndRole(u.username, u.roleId)
        }).then(function(){
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
    })
}
