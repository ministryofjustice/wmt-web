const knex = require('../../../knex').web

module.exports = function () {
  const columns = [
    'code',
    'description as name'
  ]
  return knex('team').withSchema('app').columns(columns)
}
