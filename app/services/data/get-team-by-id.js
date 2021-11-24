const knex = require('../../../knex').web

module.exports = function (id) {
  return knex('team')
    .withSchema('app')
    .where('id', id)
    .first()
}
