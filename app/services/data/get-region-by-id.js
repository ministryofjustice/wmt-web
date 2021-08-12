const knex = require('../../../knex').web

module.exports = function (id) {
  return knex('region')
    .withSchema('app')
    .where('id', id)
}
