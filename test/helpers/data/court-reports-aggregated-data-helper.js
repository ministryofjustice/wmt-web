const knex = require('../../../knex').integrationTests
const { arrayToPromise } = require('../promise-helper')

const helper = require('./aggregated-data-helper')

module.exports.addCourtReportWorkloadsForOffenderManager = function () {
  const inserts = []

  // Add workload_owners and cr workloads
  const offenderManagerTypes = [
    { grade_code: 'PO' },
    { grade_code: 'PSO' }
  ]
  return knex('offender_manager_type')
    .withSchema('app')
    .returning('id')
    .insert(offenderManagerTypes)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'offender_manager_type', id: id.id })
      })

      return addRegion(inserts)
        .then(function (inserts) {
          return knex('workload_report').withSchema('app').returning('id').insert({ effective_from: '2017-02-01' })
            .then(function ([id]) {
              inserts.push({ table: 'workload_report', id: id.id })
              return addCourtReportWorkloadPoints(inserts)
                .then(function (inserts) {
                  return addCrWorkloadPointsCalculation(inserts)
                })
            })
        })
    })
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return arrayToPromise(inserts, function (insert) {
    return knex(insert.table).withSchema('app').where('id', insert.id).del()
  })
}

module.exports.selectIdsForCourtReporterWorkloadOwner = function (inserts) {
  const results = []

  const promise = knex('workload_owner')
    .withSchema('app')
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
    .join('workload_report', 'court_reports_calculations.workload_report_id', 'workload_report.id')
    .whereNull('workload_report.effective_to')
    .orderBy('workload_report.effective_from', 'desc')
    .first('workload_owner.id', 'team_id')
    .then(function (result) {
      results.push({ table: 'workload_owner', id: result.id }, { table: 'team', id: result.team_id })
      return knex('team').withSchema('app').select('ldu_id').where('id', '=', result.team_id)
    })
    .then(function (result) {
      results.push({ table: 'ldu', id: result[0].ldu_id })
      return knex('ldu').withSchema('app').select('region_id').where('id', '=', result[0].ldu_id)
    })
    .then(function (result) {
      results.push({ table: 'region', id: result[0].region_id })
      return results
    })
  return promise
}

module.exports.getAnyExistingWorkloadOwnerId = function () {
  return knex('workload_owner')
    .withSchema('app')
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .first()
    .then(function (result) {
      return result.workload_owner_id
    })
}

module.exports.getAnyExistingCourtReporterId = function () {
  return knex('individual_court_reporter_overview')
    .withSchema('app')
    .where('contracted_hours', '>', 0)
    .first()
    .then(function (result) {
      return result.id
    })
}

module.exports.getLastRecordFromTable = function (table) {
  return knex(table)
    .withSchema('app')
    .orderBy('id', 'desc')
    .first()
    .then((results) => {
      return results
    })
}

module.exports.deleteReductionsForIds = function (ids) {
  return knex('reductions_history')
    .withSchema('app')
    .whereIn('reduction_id', ids)
    .del()
    .then(() => {
      return knex('reductions')
        .withSchema('app')
        .whereIn('id', ids)
        .del()
    })
}

const addCrWorkloadPointsCalculation = function (inserts) {
  // Add workload points calc
  const crWorkloadIdFrist = inserts.filter((item) => item.table === 'court_reports')[0].id
  const crWorkloadIdSecond = inserts.filter((item) => item.table === 'court_reports')[1].id

  const workloadPointsId = inserts.filter((item) => item.table === 'workload_points')[0].id
  const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

  const crWPCEntries = [
    {
      workload_report_id: workloadReportId,
      court_reports_id: crWorkloadIdFrist,
      workload_points_id: workloadPointsId,
      reduction_hours: 4,
      contracted_hours: 37
    },
    {
      workload_report_id: workloadReportId,
      court_reports_id: crWorkloadIdSecond,
      workload_points_id: workloadPointsId,
      reduction_hours: 5,
      contracted_hours: 38
    }
  ]

  return knex('court_reports_calculations').withSchema('app').returning('id')
    .insert(crWPCEntries)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'court_reports_calculations', id: id.id })
      })
      return inserts
    })
}

const addCourtReportWorkloadPoints = function (inserts) {
  if (inserts === undefined) {
    inserts = []
  }

  return knex('workload_points').withSchema('app').returning('id')
    .insert(helper.defaultWorkloadPoints)
    .then(function ([id]) {
      inserts.push({ table: 'workload_points', id: id.id })
      return inserts
    })
}

const addRegion = function (inserts) {
  return knex('region').withSchema('app').returning('id').insert({ description: 'NPS Test Region' })
    .then(function ([id]) {
      inserts.push({ table: 'region', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addLdu(inserts)
    })
}

const addLdu = function (inserts) {
  const regions = inserts.filter((item) => item.table === 'region')
  return knex('ldu').withSchema('app').returning('id').insert({ region_id: regions[regions.length - 1].id, description: 'Test LDU' })
    .then(function ([id]) {
      inserts.push({ table: 'ldu', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addTeam(inserts)
    })
}

const addTeam = function (inserts) {
  const ldus = inserts.filter((item) => item.table === 'ldu')
  return knex('team').withSchema('app').returning('id').insert({ ldu_id: ldus[ldus.length - 1].id, description: 'Test Team' })
    .then(function ([id]) {
      inserts.push({ table: 'team', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addPOOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addPOOffenderManager(inserts)
    })
}

const addPOOffenderManager = function (inserts) {
  const poOmType = inserts.filter((item) => item.table === 'offender_manager_type')[0]
  return knex('offender_manager').withSchema('app').returning('id').insert(
    {
      type_id: poOmType.id,
      forename: 'Test_Forename',
      surname: 'Test_Surname'
    })
    .then(function ([id]) {
      inserts.push({ table: 'offender_manager', id: id.id })
      return inserts
    })
    .then(function () {
      return addCrWorkload(inserts)
    })
}

const addCrWorkload = function (inserts) {
  // Add the workload_owner
  const numberOfOffenderManagers = inserts.filter((item) => item.table === 'offender_manager').length
  const workloadOwner = {
    team_id: inserts.filter((item) => item.table === 'team')[0].id,
    offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[numberOfOffenderManagers - 1].id,
    contracted_hours: 37.5
  }

  return knex('workload_owner').withSchema('app').returning('id').insert(workloadOwner)
    .then(function ([id]) {
      inserts.push({ table: 'workload_owner', id: id.id })
      return inserts
    })
    .then(function () {
    // new crworkload
      const numberOfWorkloadOwners = inserts.filter((item) => item.table === 'workload_owner').length
      const crWorkload = {
        workload_owner_id: inserts.filter((item) => item.table === 'workload_owner')[numberOfWorkloadOwners - 1].id,
        total_sdrs: 12,
        total_fdrs: 13,
        total_oral_reports: 14,
        staging_id: 1
      }

      return knex('court_reports').withSchema('app').returning('id').insert(crWorkload)
        .then(function ([id]) {
          inserts.push({ table: 'court_reports', id: id.id })
          return inserts
        })
    })
}
