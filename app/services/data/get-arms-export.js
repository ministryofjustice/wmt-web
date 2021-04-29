const knex = require('../../../knex').web
const getWorkloadPointsExport = require('./get-workload-points-export')

module.exports = function (id, type) {
  const table = 'arms_export_view'
  const selectList = [
    'regionName',
    'lduName',
    'teamName',
    'assessmentDate',
    'CRN',
    'omName',
    'grade_code AS omGrade',
    'sentencetype',
    'releaseDate',
    'completedDate'
  ]

  let whereString
  let armsDetails

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
      .then(function (results) {
        armsDetails = results
        return getWorkloadPointsExport().then(function (workloadPoints) {
          return {results: armsDetails, workloadPoints: workloadPoints}
        })
      })
}
