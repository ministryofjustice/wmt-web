const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.caseloadView

  // WMT0160: add new tiers to selectList
  const selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'd0',
    'd1',
    'd2',
    'd3',
    'c0',
    'c1',
    'c2',
    'c3',
    'b0',
    'b1',
    'b2',
    'b3',
    'a0',
    'a1',
    'a2',
    'a3',
    'd0_s',
    'd1_s',
    'd2_s',
    'd3_s',
    'c0_s',
    'c1_s',
    'c2_s',
    'c3_s',
    'b0_s',
    'b1_s',
    'b2_s',
    'b3_s',
    'a0_s',
    'a1_s',
    'a2_s',
    'a3_s'
  ]

  const requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  if (requiresWorkloadOwnerName) {
    selectList.push(knex.raw('CONCAT(forename, \' \', surname) AS name'))
  } else {
    selectList.push('name')
  }

  let query = knex(table)
    .withSchema('app')
    .select(selectList)

  const displayAllRecords = (type === ORGANISATION_UNIT.NATIONAL.name)

  if (!displayAllRecords) {
    if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
      query = query.where('id', id)
    }
  }

  return query
}
