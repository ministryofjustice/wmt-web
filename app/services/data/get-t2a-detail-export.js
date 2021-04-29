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

  let whereString

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
    .then(function (results) {
      return results
    })
}
