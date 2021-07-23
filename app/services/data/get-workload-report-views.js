const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const orgUnitFinder = require('../helpers/org-unit-finder')
const organisationConstant = require('../../constants/organisation-unit')

module.exports = function (id, fromDate, toDate, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.capacityView
  const table2 = 'crc_capacity_view'

  const selectList = [
    'total_points',
    'available_points',
    'effective_from',
    'reduction_hours',
    'contracted_hours'
  ]
  let workloadReportResults
  let crcWorkloadReportResults

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
      workloadReportResults = archiveDBResults
      return query
        .then(function (currentDBResults) {
          workloadReportResults = workloadReportResults.concat(currentDBResults)
          if (type === organisationConstant.NATIONAL.name) {
            return knexArchive.schema.raw('SELECT ' + selectList.join(', ') + ' FROM app.' + table2 + noExpandHint + whereString + orderBy)
              .then(function (crcArchiveDBResults) {
                crcWorkloadReportResults = crcArchiveDBResults
                return knex.schema.raw('SELECT ' + selectList.join(', ') + ' FROM app.' + table2 + noExpandHint + whereString + orderBy)
                  .then(function (crcCurrentDBResults) {
                    crcWorkloadReportResults = crcWorkloadReportResults.concat(crcCurrentDBResults)
                    return Promise.resolve({
                      workloadReportResults: workloadReportResults,
                      crcWorkloadReportResults: crcWorkloadReportResults
                    })
                  })
              })
          } else {
            return Promise.resolve({
              workloadReportResults: workloadReportResults,
              crcWorkloadReportResults: []
            })
          }
        })
    })
}
