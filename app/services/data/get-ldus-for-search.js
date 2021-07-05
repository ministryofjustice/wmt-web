const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const knexLegacy = require('../../../knex').legacy

module.exports = function (term) {
  const columns = [
    'description'
  ]
  let results
  return knex('ldu').columns(columns).whereRaw('description LIKE ?', ['%' + term + '%'])
    .then(function (currentDBResults) {
      results = currentDBResults
      return knexArchive('ldu').columns(columns).whereRaw('description LIKE ?', ['%' + term + '%'])
    })
    .then(function (archiveDBResults) {
      results = results.concat(archiveDBResults)
      return knexLegacy('ldu').columns(columns).whereRaw('description LIKE ?', ['%' + term + '%'])
    })
    .then(function (legacyDBResults) {
      results = results.concat(legacyDBResults)
      let resultArray = []
      results.forEach(function (result) {
        resultArray.push(result.description)
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
