const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.courtReporterOverview

  const selectList = [
    'link_id AS linkId',
    'total_sdrs AS totalSdrs',
    'total_fdrs AS totalFdrs',
    'total_oral_reports AS totalOralReports'
  ]

  if (ORGANISATION_UNIT.NATIONAL.name !== orgUnit.name) {
    selectList.push('id')
  }

  if (ORGANISATION_UNIT.TEAM.name === type) {
    selectList.push(knex.raw('CONCAT(forename, \' \', surname) AS name'))
    selectList.push('grade_code AS grade')
  } else {
    selectList.push('name')
  }

  let query = knex(table)
    .withSchema('app')
    .select(selectList)

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where('id', id)
  }

  return query
}
