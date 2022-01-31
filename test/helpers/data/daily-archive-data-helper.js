const config = require('../../../knexfile').legacy
const knex = require('knex')(config)

module.exports.createDailyArchive = function (dailyArchiveData) {
  const insert = {
    om_id: 1,
    om_type_id: 1,
    workload_id: dailyArchiveData.workloadID,
    workload_date: dailyArchiveData.workloadDate,
    ldu_name: dailyArchiveData.lduName,
    ldu_unique_identifier: '123',
    region_name: dailyArchiveData.regionName,
    grade: dailyArchiveData.grade,
    team_name: dailyArchiveData.teamName,
    om_name: dailyArchiveData.omName,
    total_cases: dailyArchiveData.totalCases,
    total_points: dailyArchiveData.totalPoints,
    sdr_points: dailyArchiveData.sdrPoints,
    sdr_conversion_points: dailyArchiveData.sdrConversionPoints,
    paroms_points: dailyArchiveData.paromsPoints,
    nominal_target: dailyArchiveData.nominalTarget,
    contracted_hours: dailyArchiveData.contractedHours,
    hours_reduction: dailyArchiveData.hoursReduction,
    workload_report_id: 1,
    team_unique_identifier: '456'
  }

  return knex('daily_archive_data').withSchema('dbo').returning('id').insert(insert)
    .then(function (ids) {
      return ids
    })
}

module.exports.deleteDailyArchiveByIds = function (idsToDelete) {
  return knex('daily_archive_data').withSchema('dbo').where('id', idsToDelete)
    .del()
}
