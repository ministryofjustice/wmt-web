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

  let whereString = ' WHERE effective_from >= \'' + fromDate + '\''
  whereString += ' AND effective_from <= \'' + toDate + '\''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' AND id = ' + id
  }

  const noExpandHint = ' '
  const orderBy = ' ORDER BY effective_from'

  return knexArchive.schema.raw('SELECT ' + selectList.join(', ') +
          ' FROM app.' + table +
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
