const knex = require('../../../knex').web
const knexArchive = require('../../../knex').archive
const knexLegacy = require('../../../knex').legacy

module.exports = function (term) {
  const columns = [
    'forename',
    'surname'
  ]
  let results
  return knex('offender_manager').withSchema('app').columns(columns).whereRaw('CONCAT(forename, \' \', surname) LIKE ?', ['%' + term + '%'])
    .then(function (currentDBResults) {
      results = currentDBResults
      return knexArchive('offender_manager').withSchema('app').columns(columns).whereRaw('CONCAT(forename, \' \', surname) LIKE ?', ['%' + term + '%'])
    })
    .then(function (archiveDBResults) {
      results = results.concat(archiveDBResults)
      return knexLegacy('OffenderManager').withSchema('dbo').columns(columns).whereRaw('CONCAT(forename, \' \', surname) LIKE ?', ['%' + term + '%'])
    })
    .then(function (legacyDBResults) {
      results = results.concat(legacyDBResults)
      let resultArray = []
      results.forEach(function (result) {
        resultArray.push(capitalize(result.forename) + ' ' + capitalize(result.surname))
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

const capitalize = function (s) {
  if (typeof s !== 'string') {
    return ''
  } else {
    s = s.toLowerCase()
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}
