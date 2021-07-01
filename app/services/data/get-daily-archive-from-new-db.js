module.exports = function (archiveDataForm, archiveDataLimit, isArchive = false) {
  let knex
  if (isArchive) {
    knex = require('../../../knex').archive
  } else {
    knex = require('../../../knex').web
  }

  const selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
    'workload_report_id AS workloadReportId',
    'link_id AS workloadOwnerId',
    'om_key AS omKey',
    'team_code AS teamCode',
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'available_points AS availablePoints',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction',
    'cms_adjustment_points AS cmsPoints',
    'gs_adjustment_points AS gsPoints',
    'arms_total_cases AS armsTotalCases',
    'paroms_points AS paromsPoints',
    'sdr_points AS sdrPoints',
    'sdr_conversion_points AS sdrConversionPoints',
    'nominal_target AS nominalTarget'
  ]

  if (archiveDataForm.multiSearchField !== null && archiveDataForm.multiSearchField !== undefined && archiveDataForm.multiSearchField !== '') {
    return knex('team_archive_data')
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
  } else {
    return knex('team_archive_data')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('workload_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('workload_id', 'ASC')
  }
}
