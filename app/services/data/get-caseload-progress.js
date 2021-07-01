const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.caseProgressView

  const selectList = [
    'community_last_16_weeks AS communityLast16Weeks',
    'license_last_16_weeks AS licenseLast16Weeks',
    'total_cases AS totalCases',
    'warrants_total AS warrantsTotal',
    'overdue_terminations_total AS overdueTerminationsTotal',
    'unpaid_work_total AS unpaidWorkTotal'
  ]

  const isIndexed =
    (type === ORGANISATION_UNIT.OFFENDER_MANAGER.name ||
    type === ORGANISATION_UNIT.TEAM.name)

  if (isIndexed) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
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
