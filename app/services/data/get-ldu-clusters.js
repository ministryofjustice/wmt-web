const knex = require('../../../knex').web

module.exports = function () {
  const columns = [
    'code',
    'description AS name'
  ]
  return knex('ldu').columns(columns)
}
