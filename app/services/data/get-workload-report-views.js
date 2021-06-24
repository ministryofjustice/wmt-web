const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.capacityView

  const selectList = [
    'total_points',
    'available_points',
    'effective_from',
    'reduction_hours',
    'contracted_hours'
  ]
  let workloadReportResults

  let whereString = ' WHERE effective_from >= \'' + fromDate + '\''
  whereString += ' AND effective_from <= \'' + toDate + '\''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' AND id = ' + id
  }

  const noExpandHint = ' '
  const orderBy = ' ORDER BY effective_from'

  return knexArchive.schema.raw('SELECT ' + selectList.join(', ') +
          ' FROM dbo.' + table +
          noExpandHint +
          whereString +
          orderBy)
    .then(function (archiveDBResults) {
      workloadReportResults = archiveDBResults
      return knex.schema.raw('SELECT ' + selectList.join(', ') +
          ' FROM app.' + table +
          noExpandHint +
          whereString +
          orderBy)
        .then(function (currentDBResults) {
          workloadReportResults = workloadReportResults.concat(currentDBResults)
          return workloadReportResults
        })
    })
}
