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

  const archiveQuery = knexArchive(table)
    .withSchema('app')
    .select(selectList)
    .where('effective_from', '>=', fromDate)
    .andWhere('effective_from', '<=', toDate)
    .orderBy('effective_from')

  const query = knex(table)
    .withSchema('app')
    .select(selectList)
    .where('effective_from', '>=', fromDate)
    .andWhere('effective_from', '<=', toDate)
    .orderBy('effective_from')

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    archiveQuery.andWhere('id', id)
    query.andWhere('id', id)
  }

  return archiveQuery
    .then(function (archiveDBResults) {
      return query
        .then(function (currentDBResults) {
          return archiveDBResults.concat(currentDBResults)
        })
    })
}
