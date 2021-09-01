const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 't2a_detail_export_view'
  const selectList = [
    'regionname',
    'regionid',
    'lduname',
    'lduid',
    'teamname',
    'teamid',
    'crn',
    'workload_owner_id',
    'omname',
    'omcode',
    'event_no',
    'allocation_date',
    'nsi_outcome_cd',
    'nsi_outcome_desc'
  ]

  let query = knex(table)
    .withSchema('app')
    .select(selectList)

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where(`${type}id`, id)
  }

  return query.then(function (results) {
    return results
  })
}
