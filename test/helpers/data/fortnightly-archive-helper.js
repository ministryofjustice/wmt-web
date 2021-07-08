const knex = require('../../../knex').legacy

module.exports.createFortnightlyArchive = function (archivefortnightlyData) {
  const insert = {
    start_date: archivefortnightlyData.startDate,
    end_date: archivefortnightlyData.endDate,
    ldu_name: archivefortnightlyData.lduName,
    team_name: archivefortnightlyData.teamName,
    om_name: archivefortnightlyData.omName,
    average_cases : archivefortnightlyData.totalCases,
    average_points : archivefortnightlyData.totalPoints,
    average_sdr_points : archivefortnightlyData.sdrPoints,
    average_sdr_conversion_points : archivefortnightlyData.sdrConversionPoints,
    average_paroms_points : archivefortnightlyData.paromsPoints,
    average_nominal_target : archivefortnightlyData.nominalTarget,
    average_contracted_hours : archivefortnightlyData.contractedHours,
    average_hours_reduction : archivefortnightlyData.hoursReduction,
    om_id: 999,
    om_type_id: 999
  }

  return knex('fortnightly_archive_data').withSchema('dbo').returning('id').insert(insert)
    .then(function (ids) {
      return ids
    })
}

module.exports.deleteFortnightlyArchiveById = function (idsToDelete) {
  return knex('fortnightly_archive_data').withSchema('dbo').where('id', idsToDelete)
    .del()
}
