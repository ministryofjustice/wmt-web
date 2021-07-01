const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.outstandingReportsView

  const selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'ow',
    'ot',
    'upw',
    't2a_ow AS t2aOw',
    't2a_ot AS t2aOt',
    't2a_upw AS t2aUpw',
    'sl',
    'sso'
  ]

  const requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  if (requiresWorkloadOwnerName) {
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
    .then(function (results) {
      return results
    })
}
