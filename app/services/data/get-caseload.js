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
    'd0_s as d0s',
    'd1_s as d1s',
    'd2_s as d2s',
    'd3_s as d3s',
    'c0_s as c0s',
    'c1_s as c1s',
    'c2_s as c2s',
    'c3_s as c3s',
    'b0_s as b0s',
    'b1_s as b1s',
    'b2_s as b2s',
    'b3_s as b3s',
    'a0_s as a0s',
    'a1_s as a1s',
    'a2_s as a2s',
    'a3_s as a3s'
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
