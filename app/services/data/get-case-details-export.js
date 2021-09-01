const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'case_details_export_view'
  const selectList = [
    'regionname',
    'lduname',
    'teamname',
    'tiercode',
    'rowtype',
    'casereferenceno',
    'casetype',
    'offendermanagername',
    'gradecode'
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
