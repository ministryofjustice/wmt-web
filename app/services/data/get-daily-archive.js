const knex = require('../../../knex').legacy
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDataForm) {
  const selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
    'ldu_name AS lduName',
    'region_name AS regionName',
    'grade AS grade',
    'team_name AS teamName',
    'om_name AS omName',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'sdr_points AS sdrPoints',
    'sdr_conversion_points AS sdrConversionPoints',
    'paroms_points AS paromsPoints',
    'nominal_target AS nominalTarget',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction',
    'workload_report_id AS workloadReportId',
    'unique_identifier AS omKey',
    'team_unique_identifier AS teamCode'
  ]

  if (archiveDataForm.multiSearchField !== null && archiveDataForm.multiSearchField !== undefined && archiveDataForm.multiSearchField !== '') {
    return knex('daily_archive_data')
      .withSchema('dbo')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('workload_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .andWhere(function () {
        this.whereIn('team_name', archiveDataForm.multiSearchField)
          .orWhereIn('ldu_name', archiveDataForm.multiSearchField)
          .orWhereIn('om_name', archiveDataForm.multiSearchField)
      })
      .orderBy('workload_id', 'ASC')
      .then(function (results) {
        return addAbsentFields(results)
      })
  } else {
    return knex('daily_archive_data')
      .withSchema('dbo')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('workload_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('workload_id', 'ASC')
      .then(function (results) {
        return addAbsentFields(results)
      })
  }
}

const addAbsentFields = function (results) {
  results.forEach(function (result) {
    result.cmsPoints = 'N/A'
    result.gsPoints = 'N/A'
    result.cmsPercentage = 'N/A'
    result.gsPercentage = 'N/A'
    result.cmsColumn = 'N/A'
    result.gsColumn = 'N/A'
    result.armsTotalCases = 'N/A'
  })
  return results
}
