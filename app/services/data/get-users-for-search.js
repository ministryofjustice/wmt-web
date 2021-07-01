const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const knexLegacy = require('../../../knex').legacy

module.exports = function (term) {
  let results
  return knex('users').columns(['name']).whereRaw('name LIKE ?', ['%' + term + '%'])
    .then(function (currentDBResults) {
      results = currentDBResults
      return knexArchive('users').columns(['name']).whereRaw('name LIKE ?', ['%' + term + '%'])
    })
    .then(function (archiveDBResults) {
      results = results.concat(archiveDBResults)
      return knexLegacy('archive_reduction_data').distinct(['reduction_added_by AS name']).whereRaw('reduction_added_by LIKE ?', ['%' + term + '%'])
    })
    .then(function (legacyDBResults) {
      results = results.concat(legacyDBResults)
      let resultArray = []
      results.forEach(function (result) {
        resultArray.push(result.name)
      })
      resultArray = Array.from(new Set(resultArray)).sort()
      results = []
      resultArray.forEach(function (result) {
        results.push({
          id: result,
          text: result
        })
      })
      return results
    })
}
