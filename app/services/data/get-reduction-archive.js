const knex = require('../../../knex').legacy
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDataForm) {
  const selectColumns = [
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy'
  ]

  if (archiveDataForm.multiSearchField !== null && archiveDataForm.multiSearchField !== undefined && archiveDataForm.multiSearchField !== '') {
    return knex('archive_reduction_data')
      .withSchema('dbo')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('last_updated_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .andWhere(function () {
        this.whereIn('om_name', archiveDataForm.multiSearchField)
          .orWhereIn('reduction_added_by', archiveDataForm.multiSearchField)
      })
      .orderBy('last_updated_date', 'ASC')
  } else {
    return knex('archive_reduction_data')
      .withSchema('dbo')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('last_updated_date', [archiveDataForm.archiveFromDate.toISOString().substring(0, 10),
        archiveDataForm.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('last_updated_date', 'ASC')
  }
}
