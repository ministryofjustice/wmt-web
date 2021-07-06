const knex = require('../../knex').web
const shelljs = require('shelljs')
const expect = require('chai').expect
// const setupData = require('../helpers/data/aggregated-data-helper').addWorkloadCapacitiesForOffenderManager

const setupData = require('../helpers/data/court-reports-aggregated-data-helper').addCourtReportWorkloadsForOffenderManager

describe('accessibility/pa11y', function () {
  const pathToScript = './test/accessibility/run-pa11y.sh'
  it('should run accessiblity tests', function () {
    let offenderManagerId
    let teamId
    let lduId
    let regionId
    let courtReporterId

    return setupData().then(() => {
      return knex('workload_owner').withSchema('app')
        .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
        .join('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
        .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
        .whereNull('workload_report.effective_to')
        .orderBy('workload_report.effective_from', 'desc')
        .select('workload_owner.id').first()
        .then(function (workloadOwner) {
          offenderManagerId = workloadOwner.id
          return knex('team').withSchema('app').select('id').first()
            .then(function (team) {
              teamId = team.id
              return knex('ldu').withSchema('app').select('id').first()
                .then(function (ldu) {
                  lduId = ldu.id
                  return knex('region').withSchema('app').select('id').first()
                    .then(function (region) {
                      regionId = region.id
                      return knex('workload_owner').withSchema('app')
                        .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
                        .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
                        .join('workload_report', 'court_reports_calculations.workload_report_id', 'workload_report.id')
                        .whereNull('workload_report.effective_to')
                        .orderBy('workload_report.effective_from', 'desc')
                        .select('workload_owner.id').first()
                        .then(function (workloadOwnerCr) {
                          courtReporterId = workloadOwnerCr.id
                          const cmd = pathToScript + ' ' + regionId + ' ' + lduId + ' ' + teamId + ' ' + offenderManagerId + ' ' + courtReporterId
                          expect(shelljs.exec(cmd).code).to.eql(0)
                        })
                    })
                })
            })
        })
    })
  })
})
