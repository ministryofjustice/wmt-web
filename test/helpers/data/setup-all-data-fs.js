const aggregatedDataHelper = require('./aggregated-data-helper')
const courtReportsDataHelper = require('./court-reports-aggregated-data-helper')
const userRoleHelper = require('./user-role-helper')
const dailyArchiveDataHelper = require('./daily-archive-data-helper')

const { users } = require('../routes/authentication-helper')
const path = require('path')
const fs = require('fs')
const dailyArchiveData = require('./setup-data')

const testCourtInserts = path.resolve(__dirname, '../../testDataCourtInserts.json')
const testWorkloadInserts = path.resolve(__dirname, '../../testDataWorkloadInserts.json')
const testUserInserts = path.resolve(__dirname, '../../testDataUserInserts.json')
const dailyArchiveInserts = path.resolve(__dirname, '../../testDataDailyArchiveInserts.json')

const caseDetailsData =
  {
    workload_id: 0,
    row_type: 'U', // U = Unpaid work
    case_ref_no: 'X555555',
    tier_code: 3,
    team_code: 'WMT',
    grade_code: 'C',
    location: 'COMMUNITY'
  }

const cmsData = {
  adjustment_reason_id: 1,
  workload_owner_id: 1,
  points: -9,
  contact_id: 123456789,
  effective_from: new Date(),
  effective_to: new Date(),
  status: 'ACTIVE',
  case_ref_no: 'X555555'
}

module.exports = function () {
  return dailyArchiveDataHelper.createDailyArchive(dailyArchiveData).then(function (dailyArchiveId) {
    const dailyArchiveIdInsert = [{ table: 'daily_archive_data', id: dailyArchiveId }]
    return courtReportsDataHelper.addCourtReportWorkloadsForOffenderManager()
      .then(function (courtReportInserts) {
        return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (workloadInserts) {
          caseDetailsData.workload_id = workloadInserts.filter((item) => item.table === 'workload')[1].id
          return aggregatedDataHelper.addCaseDetails(caseDetailsData).then(function (caseDetailInserts) {
            workloadInserts = workloadInserts.concat(caseDetailInserts)
            cmsData.workload_owner_id = workloadInserts.filter((item) => item.table === 'workload_owner')[0].id
            return aggregatedDataHelper.addCMSData(cmsData).then(function (CMSInserts) {
              workloadInserts = workloadInserts.concat(CMSInserts)
              const promises = Object.entries(users).map(function ([, u]) {
                return userRoleHelper.addUserAndRole(u.username.toLowerCase(), u.roleId)
              })
              return Promise.all(promises).then(function (userInserts) {
                try {
                  fs.writeFileSync(dailyArchiveInserts, JSON.stringify(dailyArchiveIdInsert))
                  fs.writeFileSync(testCourtInserts, JSON.stringify(courtReportInserts))
                  fs.writeFileSync(testWorkloadInserts, JSON.stringify(workloadInserts))
                  fs.writeFileSync(testUserInserts, JSON.stringify(userInserts.reduce((acc, x) => acc.concat(x), [])))
                } catch (err) {
                  console.error(err)
                }
                return {
                  courtReportInserts,
                  workloadInserts,
                  dailyArchiveIdInsert,
                  userInserts
                }
              })
            })
          })
        })
      })
  })
}
