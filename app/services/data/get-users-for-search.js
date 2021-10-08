const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const knexLegacy = require('../../../knex').legacy

module.exports = function (term) {
  let results
  return knex('users').withSchema('app').columns(['name']).where('name', 'ilike', `%${term}%`)
    .then(function (currentDBResults) {
      results = currentDBResults
      return knexArchive('users').withSchema('app').columns(['name']).where('name', 'ilike', `%${term}%`)
    })
    .then(function (archiveDBResults) {
      results = results.concat(archiveDBResults)
      return knexLegacy('archive_reduction_data').withSchema('dbo').distinct(['reduction_added_by AS name']).where('reduction_added_by', 'ilike', `%${term}%`)
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
