const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'arms_export_view'

  const selectList = [
    'regionname',
    'lduname',
    'teamname',
    'assessmentdate',
    'crn',
    'omname',
    'grade_code AS omgrade',
    'sentencetype',
    'releasedate',
    'completeddate'
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
