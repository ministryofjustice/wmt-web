const knex = require('../../../knex').web
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDataForm) {
  const selectColumns = [
    'reduction_id AS reductionId',
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy',
    'reduction_reason AS reductionReason',
    'start_date AS startDate',
    'end_date AS endDate',
    'reduction_status AS reductionStatus'
  ]

  if (archiveDataForm.multiSearchField !== null && archiveDataForm.multiSearchField !== undefined && archiveDataForm.multiSearchField !== '') {
    return knex('reductions_archive_view')
      .withSchema('app')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .where(function () {
        this.where('start_date', '<=', archiveDataForm.archiveFromDate.toISOString().substring(0, 10))
          .where('end_date', '>=', archiveDataForm.archiveToDate.toISOString().substring(0, 10))
          .orWhereBetween('start_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
            archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
          .orWhereBetween('end_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
            archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      })
      .andWhere(function () {
        this.whereIn('om_name', archiveDataForm.multiSearchField)
          .orWhereIn('reduction_added_by', archiveDataForm.multiSearchField)
      })
      .orderBy('last_updated_date', 'ASC')
  } else {
    return knex('reductions_archive_view')
      .withSchema('app')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .where('start_date', '<=', archiveDataForm.archiveFromDate.toISOString().substring(0, 10))
      .where('end_date', '>=', archiveDataForm.archiveToDate.toISOString().substring(0, 10))
      .orWhereBetween('start_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .orWhereBetween('end_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('last_updated_date', 'ASC')
  }
}
