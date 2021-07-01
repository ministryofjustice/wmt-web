const knex = require('../../../knex').web

module.exports = function (id) {
  const table = 'team_case_details_view'
  const selectList = [
    'link_id AS linkId',
    'team_description AS teamDescription',
    'ldu_description AS lduDescription',
    'link_id AS linkId',
    'CONCAT(forename, \' \', surname) AS name',
    'grade_code AS grade',
    'flag AS inactiveCaseType',
    'case_ref_no AS caseRefNumber',
    'location',
    'tier_code AS tierNumber'
  ]

  let query = knex(table)
  .withSchema('app')
  .select(selectList)
  .where('flag','U')
  .orWhere('flag','W')
  .orWhere('flag','O')
  .orWhere('flag','S')

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.andWhere('id',id)
  }

  return query.then(function (results) {
      return results
    })
}
