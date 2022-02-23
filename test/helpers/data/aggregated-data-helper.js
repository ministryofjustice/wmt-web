const knex = require('../../knex').integrationTests
const { arrayToPromise } = require('../promise-helper')

module.exports.maxStagingId = null

const defaultWorkload = {
  total_cases: 5,
  total_community_cases: 0,
  total_custody_cases: 0,
  total_license_cases: 0,
  total_t2a_cases: 3,
  total_t2a_community_cases: 0,
  total_t2a_custody_cases: 0,
  total_t2a_license_cases: 0,
  monthly_sdrs: 10,
  sdr_due_next_30_days: 0,
  sdr_conversions_last_30_days: 9,
  paroms_completed_last_30_days: 8,
  paroms_due_next_30_days: 0,
  license_last_16_weeks: 9,
  community_last_16_weeks: 10
}

module.exports.defaultWorkloadPoints = {
  comm_tier_1: 206,
  comm_tier_2: 158,
  comm_tier_3: 146,
  comm_tier_4: 110,
  comm_tier_5: 146,
  comm_tier_6: 115,
  comm_tier_7: 102,
  comm_tier_8: 72,
  comm_tier_9: 79,
  comm_tier_10: 63,
  comm_tier_11: 50,
  comm_tier_12: 35,
  comm_tier_13: 51,
  comm_tier_14: 41,
  comm_tier_15: 29,
  comm_tier_16: 29,
  cust_tier_1: 75,
  cust_tier_2: 60,
  cust_tier_3: 59,
  cust_tier_4: 0,
  cust_tier_5: 59,
  cust_tier_6: 48,
  cust_tier_7: 47,
  cust_tier_8: 0,
  cust_tier_9: 30,
  cust_tier_10: 24,
  cust_tier_11: 23,
  cust_tier_12: 0,
  cust_tier_13: 17,
  cust_tier_14: 14,
  cust_tier_15: 13,
  cust_tier_16: 0,
  lic_tier_1: 219,
  lic_tier_2: 175,
  lic_tier_3: 163,
  lic_tier_4: 0,
  lic_tier_5: 161,
  lic_tier_6: 132,
  lic_tier_7: 119,
  lic_tier_8: 0,
  lic_tier_9: 77,
  lic_tier_10: 65,
  lic_tier_11: 52,
  lic_tier_12: 0,
  lic_tier_13: 51,
  lic_tier_14: 43,
  lic_tier_15: 31,
  lic_tier_16: 0,
  user_id: 123,
  sdr: 4,
  sdr_conversion: 5,
  nominal_target_spo: 1234,
  nominal_target_po: 5678,
  default_contracted_hours_po: 37,
  default_contracted_hours_pso: 38,
  default_contracted_hours_spo: 0,
  weighting_o: 10,
  weighting_w: 20,
  weighting_u: 70,
  paroms_enabled: 1,
  parom: 99,
  effective_from: '2017-04-01',
  effective_to: null,
  is_t2a: false
}

module.exports.addOrgHierarchyWithPoAndPso = function () {
  return module.exports.addCaseProgressDataForAllOrgUnits()
    .then(function (inserts) {
      return module.exports.addPoOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addPsoOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addPsoOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addTeam(inserts)
    })
    .then(function (inserts) {
      return module.exports.addPoOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addPsoOffenderManager(inserts)
    })
}

module.exports.addCaseProgressDataForAllOrgUnits = function () {
  return module.exports.addWorkloadCapacitiesForOffenderManager()
    .then(function (inserts) {
      return module.exports.addPoOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addTeam(inserts)
    })
    .then(function (inserts) {
      return addLdu(inserts)
    })
    .then(function (inserts) {
      return addRegion(inserts)
    })
}

module.exports.addWorkloadCapacitiesForOffenderManager = function () {
  const inserts = []

  const promise = module.exports.addWorkloadPoints(inserts)
    .then(function (inserts) {
      return module.exports.addWorkloadPointsT2A(inserts)
    })
    .then(function (inserts) {
      return addWorkloadReports(inserts)
    })
    .then(function () {
      const offenderManagerTypes = [
        { grade_code: 'PO' },
        { grade_code: 'PSO' }
      ]
      return knex('offender_manager_type').withSchema('app').returning('id').insert(offenderManagerTypes)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'offender_manager_type', id })
      })
      return addRegion(inserts)
    })
  return promise
}

module.exports.addWorkloadPointsT2A = function (inserts) {
  return module.exports.addWorkloadPoints(inserts, true)
}

module.exports.addWorkloadPoints = function (inserts, isT2A = false) {
  if (inserts === undefined) {
    inserts = []
  }
  const workloadPoints = [
    Object.assign({}, module.exports.defaultWorkloadPoints, {
      is_t2a: isT2A
    }),
    Object.assign({}, module.exports.defaultWorkloadPoints, {
      comm_tier_1: 111,
      comm_tier_2: 112,
      comm_tier_3: 113,
      effective_from: '2017-01-01',
      effective_to: '2017-02-01',
      is_t2a: isT2A
    })
  ]

  return knex('workload_points').withSchema('app').returning('id').insert(workloadPoints)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'workload_points', id: id.id })
      })
      return inserts
    })
}

const addWorkloadReports = function (inserts) {
  const workloadReports = [
    { effective_from: '2017-01-01', effective_to: '2017-02-01' },
    { effective_from: '2017-02-01' }
  ]

  return knex('workload_report').withSchema('app').returning('id').insert(workloadReports)
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'workload_report', id })
      })
      return inserts
    })
}

module.exports.addInProgressWorkloadReport = function (inserts) {
  const workloadReports = [
    { effective_from: '2017-02-01', status: 'IN-PROGRESS' }
  ]

  return knex('workload_report').withSchema('app').returning(['id', 'effective_from']).insert(workloadReports)
    .then(function ([result]) {
      inserts.push({ table: 'workload_report', id: result.id, effective_from: result.effective_from })
      return inserts
    })
}

const addRegion = function (inserts) {
  return knex('region').withSchema('app').returning('id').insert({ description: 'NPS Test Region', code: 'NPS1' })
    .then(function ([id]) {
      inserts.push({ table: 'region', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addLdu(inserts)
    })
}

const addTeam = function (inserts) {
  const ldus = inserts.filter((item) => item.table === 'ldu')
  return knex('team').withSchema('app').returning('id').insert({ ldu_id: ldus[ldus.length - 1].id, description: 'Test Team', code: 'NPS1LDU1T1' })
    .then(function ([id]) {
      inserts.push({ table: 'team', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return module.exports.addPoOffenderManager(inserts)
    })
}

const addLdu = function (inserts) {
  const regions = inserts.filter((item) => item.table === 'region')
  return knex('ldu').withSchema('app').returning('id').insert({ region_id: regions[regions.length - 1].id, description: 'Test LDU', code: 'NPS1LDU1' })
    .then(function ([id]) {
      inserts.push({ table: 'ldu', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addTeam(inserts)
    })
}

module.exports.addPoOffenderManager = function (inserts) {
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
      return addWorkloadOwner(inserts)
    })
}

const addPsoOffenderManager = function (inserts) {
  const psoOmType = inserts.filter((item) => item.table === 'offender_manager_type')[1]
  return knex('offender_manager').withSchema('app').returning('id').insert(
    {
      type_id: psoOmType.id,
      forename: 'Test_Forename',
      surname: 'Test_Surname'
    })
    .then(function ([id]) {
      inserts.push({ table: 'offender_manager', id: id.id })
      return inserts
    })
    .then(function () {
      return addWorkloadOwner(inserts)
    })
}

const addWorkloadOwner = function (inserts) {
  const teams = inserts.filter((item) => item.table === 'team')
  const offenderManagers = inserts.filter((item) => item.table === 'offender_manager')

  return knex('workload_owner').withSchema('app').returning('id').insert(
    {
      team_id: teams[teams.length - 1].id,
      offender_manager_id: offenderManagers[offenderManagers.length - 1].id,
      contracted_hours: 37
    }
  )
    .then(function ([id]) {
      inserts.push({ table: 'workload_owner', id: id.id })
      return inserts
    })
    .then(function (inserts) {
      return addWorkloads(inserts)
        .then(function () {
          return addOmicWorkloads(inserts)
        })
    })
}

const addWorkloads = function (inserts) {
  return getMaxStagingId()
    .then(function (upToDateMaxStagingId) {
      module.exports.maxStagingId = upToDateMaxStagingId
      const workloadOwners = inserts.filter((item) => item.table === 'workload_owner')
      const workloadReports = inserts.filter((item) => item.table === 'workload_report')
      const currentWorkloadOwnerId = workloadOwners[workloadOwners.length - 1].id

      const workloads = []

      let i = 1
      workloadReports.forEach(function (report) {
        workloads.push(Object.assign({}, defaultWorkload, {
          workload_owner_id: currentWorkloadOwnerId,
          staging_id: upToDateMaxStagingId + (i++),
          workload_report_id: report.id,
          total_filtered_cases: 5
        }))
      })
      return knex('workload').withSchema('app').returning('id').insert(workloads)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'workload', id: id })
      })

      const workloads = inserts.filter((item) => item.table === 'workload')
      const workloadReports = inserts.filter((item) => item.table === 'workload_report')

      const defaultWorkloadPointsCalculations = {
        workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
        t2a_workload_points_id: inserts.filter((item) => item.table === 'workload_points')[2].id,
        total_points: 0,
        sdr_points: 0,
        sdr_conversion_points: 0,
        paroms_points: 0,
        nominal_target: 0,
        available_points: 0,
        contracted_hours: 37.5,
        reduction_hours: 3,
        cms_adjustment_points: 0,
        gs_adjustment_points: -2,
        arms_total_cases: 5
      }

      const calculations = []
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        total_points: 20,
        available_points: 10,
        workload_report_id: workloadReports[0].id,
        workload_id: workloads[workloads.length - 2].id
      }))
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        workload_report_id: workloadReports[workloadReports.length - 1].id,
        workload_id: workloads[workloads.length - 1].id,
        total_points: 50,
        available_points: 25
      }))

      return knex('workload_points_calculations').withSchema('app').returning('id').insert(calculations)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'workload_points_calculations', id: id })
      })
      const workloads = inserts.filter((item) => item.table === 'workload')
      const defaultTier = {
        workload_id: workloads[workloads.length - 1].id,
        tier_number: 1,
        overdue_terminations_total: 10,
        unpaid_work_total: 10,
        warrants_total: 10,
        suspended_total: 10,
        suspended_lifer_total: 99,
        t2a_overdue_terminations_total: 10,
        t2a_unpaid_work_total: 10,
        t2a_warrants_total: 10,
        total_cases: 10,
        total_filtered_cases: 10,
        location: 'COMMUNITY'
      }

      const tiers = []
      const locations = ['COMMUNITY', 'CUSTODY', 'LICENSE']
      locations.forEach(function (location) {
        for (let tierNumber = 0, totalCases = 0; tierNumber < 17; tierNumber++, totalCases++) {
          tiers.push(Object.assign({}, defaultTier, { tier_number: tierNumber, location: location, total_cases: totalCases, total_filtered_cases: totalCases }))
        }
      })
      return knex.batchInsert('app.tiers', tiers, 149).returning('id')
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'tiers', id: id })
      })
      return inserts
    })
}

const addOmicWorkloads = function (inserts) {
  return getMaxOmicStagingId()
    .then(function (upToDateMaxStagingId) {
      const workloadOwners = inserts.filter((item) => item.table === 'workload_owner')
      const workloadReports = inserts.filter((item) => item.table === 'workload_report')
      const currentWorkloadOwnerId = workloadOwners[workloadOwners.length - 1].id

      const workloads = []

      let i = 1
      workloadReports.forEach(function (report) {
        workloads.push(Object.assign({}, defaultWorkload, {
          workload_owner_id: currentWorkloadOwnerId,
          staging_id: upToDateMaxStagingId + (i++),
          workload_report_id: report.id,
          total_filtered_cases: 5
        }))
      })
      return knex('omic_workload').withSchema('app').returning('id').insert(workloads)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'omic_workload', id: id })
      })

      const workloads = inserts.filter((item) => item.table === 'omic_workload')
      const workloadReports = inserts.filter((item) => item.table === 'workload_report')

      const defaultWorkloadPointsCalculations = {
        workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
        t2a_workload_points_id: inserts.filter((item) => item.table === 'workload_points')[2].id,
        sdr_points: 0,
        sdr_conversion_points: 0,
        paroms_points: 0,
        nominal_target: 0,
        available_points: 0,
        contracted_hours: 37.5,
        arms_total_cases: 5,
        custody_points: 10,
        licence_points: 10
      }

      const calculations = []
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        arms_points: 20,
        available_points: 10,
        workload_report_id: workloadReports[0].id,
        omic_workload_id: workloads[workloads.length - 2].id
      }))
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        workload_report_id: workloadReports[workloadReports.length - 1].id,
        omic_workload_id: workloads[workloads.length - 1].id,
        arms_points: 50,
        available_points: 25
      }))

      return knex('omic_workload_points_calculations').withSchema('app').returning('id').insert(calculations)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'omic_workload_points_calculations', id: id })
      })
      const workloads = inserts.filter((item) => item.table === 'omic_workload')
      const defaultTier = {
        omic_workload_id: workloads[workloads.length - 1].id,
        tier_number: 1,
        overdue_terminations_total: 10,
        unpaid_work_total: 10,
        warrants_total: 10,
        suspended_total: 10,
        suspended_lifer_total: 99,
        t2a_overdue_terminations_total: 10,
        t2a_unpaid_work_total: 10,
        t2a_warrants_total: 10,
        total_cases: 10,
        total_filtered_cases: 10,
        location: 'COMMUNITY'
      }

      const tiers = []
      const locations = ['COMMUNITY', 'CUSTODY', 'LICENSE']
      locations.forEach(function (location) {
        for (let tierNumber = 0, totalCases = 0; tierNumber < 17; tierNumber++, totalCases++) {
          tiers.push(Object.assign({}, defaultTier, { tier_number: tierNumber, location: location, total_cases: totalCases, total_filtered_cases: totalCases }))
        }
      })
      return knex.batchInsert('app.omic_tiers', tiers, 149).returning('id')
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'omic_tiers', id: id })
      })
      return inserts
    })
}

module.exports.addCaseDetails = function (caseDetails) {
  const inserts = []
  return knex('case_details')
    .withSchema('app')
    .returning('id')
    .insert(caseDetails).then(function ([id]) {
      inserts.push({ table: 'case_details', id: id.id })
      return knex
        .schema
        .raw('REFRESH MATERIALIZED VIEW app.case_details_export_view')
        .then(function () {
          return inserts
        })
    })
}

module.exports.selectIdsForWorkloadOwner = function () {
  const results = []

  const promise = knex('workload_owner')
    .withSchema('app')
    .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
    .join('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
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

module.exports.getAnyExistingWorkloadId = function () {
  const promise = knex('workload')
    .withSchema('app')
    .first('id')
    .then(function (result) {
      return result.id
    })
  return promise
}

module.exports.getAnyExistingWorkloadOwnerId = function () {
  return knex('individual_case_overview')
    .withSchema('app')
    .where('contracted_hours', '>', 0)
    .first('workload_owner_id AS id')
    .then(function (result) {
      return result.id
    })
}

module.exports.getAnyExistingUserId = function () {
  return knex('users')
    .withSchema('app')
    .first('id')
    .then(function (result) {
      return result.id
    })
}

module.exports.getAnyExistingCourtReportWorkloadOwnerId = function () {
  return knex('individual_court_reporter_overview')
    .withSchema('app')
    .where('contracted_hours', '>', 0)
    .first('id')
    .then(function (result) {
      return result.id
    })
}

module.exports.getAnyExistingWorkloadReportId = function () {
  return knex('workload_report')
    .withSchema('app')
    .first('id')
    .then(function (result) {
      return result.id
    })
}

module.exports.getAnyExistingReductionReasonId = function () {
  const promise = knex('reduction_reason')
    .withSchema('app')
    .first('id')
    .then(function (result) {
      return result.id
    })
  return promise
}

module.exports.getAnyExistingRegionId = function () {
  const promise = knex('region')
    .withSchema('app')
    .first('id')
    .then(function (result) {
      return result.id
    })
  return promise
}

module.exports.getAllExistingReductions = function () {
  const promise = knex('reductions')
    .withSchema('app')
    .count('id')
    .then(function (result) {
      return result
    })
  return promise
}

module.exports.selectGradeForWorkloadOwner = function (workloadOwnerId) {
  const promise = knex('workload_owner')
    .withSchema('app')
    .join('offender_manager', 'offender_manager.id', 'offender_manager_id')
    .join('offender_manager_type', 'offender_manager.type_id', 'offender_manager_type.id')
    .first('offender_manager_type.grade_code')
    .where('workload_owner.id', workloadOwnerId)
    .then(function (results) {
      return results.grade_code
    })
  return promise
}

module.exports.selectCapacityForWorkloadOwner = function (workloadOwnerId) {
  return knex('individual_case_overview')
    .withSchema('app')
    .select('total_points', 'available_points')
    .where('workload_owner_id', workloadOwnerId)
    .then(function ([result]) {
      return (result.total_points / result.available_points) * 100
    })
}

module.exports.getOffenderManagerTeamRegionLduByWorkloadOwnerId = function (workloadOwnerId) {
  return knex('workload_owner')
    .withSchema('app')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('ldu', 'team.ldu_id', 'ldu.id')
    .join('region', 'ldu.region_id', 'region.id')
    .first()
    .select('offender_manager.forename', 'offender_manager.surname', 'team.code AS teamCode', 'team.description AS teamDescription', 'ldu.code AS lduCode', 'ldu.description AS lduDescription',
      'region.code AS regionCode', 'region.description AS regionDescription', 'workload_owner.contracted_hours as contractedHours')
    .where('workload_owner.id', workloadOwnerId)
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return arrayToPromise(inserts, function (insert) {
    return knex(insert.table).withSchema('app').where('id', insert.id).del()
  })
}

module.exports.rowGenerator = function (name, baseRow, multiplier) {
  const row = Object.assign({}, baseRow)
  if (multiplier !== undefined) {
    for (const [key, value] of Object.entries(baseRow)) {
      row[key] = value * multiplier
    }
  }
  return Object.assign({}, row, { name: name })
}

module.exports.getWorkloadReportEffectiveFromDate = function () {
  return knex('workload_report')
    .withSchema('app')
    .first('effective_from')
    .whereNull('effective_to')
    .orderBy('id', 'desc')
}

module.exports.generateNonExistantWorkloadOwnerId = function () {
  return knex('workload_owner')
    .withSchema('app')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId + 1
    })
}

module.exports.generateNonExistantTeamId = function () {
  return knex('team')
    .withSchema('app')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId + 1
    })
}

module.exports.generateNonExistantLduId = function () {
  return knex('ldu')
    .withSchema('app')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId + 1
    })
}

module.exports.generateNonExistantRegionId = function () {
  return knex('region')
    .withSchema('app')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId + 1
    })
}

module.exports.getAllTasks = function () {
  return knex('tasks')
    .withSchema('app')
    .select('submitting_agent',
      'type',
      'additional_data',
      'workload_report_id',
      'status'
    )
}

module.exports.deleteAllTasks = function () {
  return knex('tasks')
    .withSchema('app')
    .del()
}

module.exports.getAllWorkloadPointsForTest = function () {
  return knex('workload_points')
    .withSchema('app')
    .select(
      'comm_tier_1 AS commA3',
      'comm_tier_2 AS commA2',
      'comm_tier_3 AS commA1',
      'comm_tier_4 AS commA0',
      'comm_tier_5 AS commB3',
      'comm_tier_6 AS commB2',
      'comm_tier_7 AS commB1',
      'comm_tier_8 AS commB0',
      'comm_tier_9 AS commC3',
      'comm_tier_10 AS commC2',
      'comm_tier_11 AS commC1',
      'comm_tier_12 AS commC0',
      'comm_tier_13 AS commD3',
      'comm_tier_14 AS commD2',
      'comm_tier_15 AS commD1',
      'comm_tier_16 AS commD0',
      'cust_tier_1 AS cusA3',
      'cust_tier_2 AS cusA2',
      'cust_tier_3 AS cusA1',
      'cust_tier_4 AS cusA0',
      'cust_tier_5 AS cusB3',
      'cust_tier_6 AS cusB2',
      'cust_tier_7 AS cusB1',
      'cust_tier_8 AS cusB0',
      'cust_tier_9 AS cusC3',
      'cust_tier_10 AS cusC2',
      'cust_tier_11 AS cusC1',
      'cust_tier_12 AS cusC0',
      'cust_tier_13 AS cusD3',
      'cust_tier_14 AS cusD2',
      'cust_tier_15 AS cusD1',
      'cust_tier_16 AS cusD0',
      'lic_tier_1 AS licA3',
      'lic_tier_2 AS licA2',
      'lic_tier_3 AS licA1',
      'lic_tier_4 AS licA0',
      'lic_tier_5 AS licB3',
      'lic_tier_6 AS licB2',
      'lic_tier_7 AS licB1',
      'lic_tier_8 AS licB0',
      'lic_tier_9 AS licC3',
      'lic_tier_10 AS licC2',
      'lic_tier_11 AS licC1',
      'lic_tier_12 AS licC0',
      'lic_tier_13 AS licD3',
      'lic_tier_14 AS licD2',
      'lic_tier_15 AS licD1',
      'lic_tier_16 AS licD0',
      'sdr AS sdr',
      'user_id AS userId',
      'sdr_conversion AS sdrConversion',
      'nominal_target_spo AS nominalTargetPso',
      'nominal_target_po AS nominalTargetPo',
      'default_contracted_hours_po AS defaultContractedHoursPo',
      'default_contracted_hours_pso AS defaultContractedHoursPso',
      'default_contracted_hours_spo AS defaultContractedHoursSpo',
      'weighting_o AS weightingOverdue',
      'weighting_w AS weightingWarrants',
      'weighting_u AS weightingUpw',
      'parom AS parom',
      'effective_to AS effectiveTo',
      'is_t2a AS isT2A'
    )
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

module.exports.createReductionForWorkloadOwner = function (workloadOwnerId, userId) {
  return knex('reductions')
    .withSchema('app')
    .returning('id')
    .insert({
      workload_owner_id: workloadOwnerId,
      hours: 10,
      effective_from: '01 Jan 2020 00:00:00 GMT',
      status: 'ACTIVE',
      notes: '.',
      user_id: userId
    })
    .then(function ([result]) {
      return { table: 'reductions', id: result.id }
    })
}

module.exports.deleteReductionsForWorkloadOwner = function (workloadOwnerId) {
  return knex('reductions')
    .withSchema('app')
    .where('workload_owner_id', '=', workloadOwnerId)
    .select('id').then((reductionIds) => {
      return knex('reductions_history')
        .withSchema('app')
        .whereIn('reduction_id', reductionIds.map(r => r.id))
        .del()
        .then(() => {
          return knex('reductions')
            .withSchema('app')
            .where('workload_owner_id', '=', workloadOwnerId)
            .del()
        })
    })
}

module.exports.deleteRecordsFromTableForIds = function (table, ids) {
  return knex(table)
    .withSchema('app')
    .whereIn('id', ids)
    .del()
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

const getMaxStagingId = function () {
  return knex('workload')
    .withSchema('app')
    .max('staging_id AS maxStagingId')
    .then(function (results) {
      return results[0].maxStagingId
    })
}

const getMaxOmicStagingId = function () {
  return knex('omic_workload')
    .withSchema('app')
    .max('staging_id AS maxStagingId')
    .then(function (results) {
      return results[0].maxStagingId
    })
}
