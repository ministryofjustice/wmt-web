const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'gs_export_view'
  const selectList = [
    'regionName',
    'lduName',
    'teamName',
    'contactDate',
    'contactId',
    'caseRefNo',
    'omName',
    'omGradeCode',
    'contact_description AS contactDescription',
    'contactCode',
    'points'
  ]

  const query = knex(table)
    .withSchema('app')
    .select(selectList)

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query.where(`${type}id`, id)
  }

  return query.then(function (results) {
    return results
  })
}
