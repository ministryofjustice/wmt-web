const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 't2a_detail_export_view'
  const selectList = [
    'regionName',
    'regionId',
    'lduName',
    'lduId',
    'teamName',
    'teamId',
    'CRN',
    'workload_owner_id',
    'omName',
    'omCode',
    'Event_No',
    'Allocation_Date',
    'NSI_Outcome_Cd',
    'NSI_Outcome_Desc'
  ]

  let query = knex(table)
  .withSchema('app')
  .select(selectList)

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where(`${type}id`,id)
  }

  return query.then(function (results) {
      return results
    })
}
