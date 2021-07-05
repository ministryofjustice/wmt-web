const knex = require('../../../knex').web

module.exports = function () {
  const columns = [
    'code',
    'description as name'
  ]
  return knex('team').columns(columns)
}
