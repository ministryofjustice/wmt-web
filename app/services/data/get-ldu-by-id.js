const knex = require('../../../knex').web

module.exports = function (id) {
  return knex('ldu')
    .withSchema('app')
    .where('id', id)
}
