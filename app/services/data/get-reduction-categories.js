const knex = require('../../../knex').web

module.exports = function () {
  return knex('reduction_category')
    .withSchema('app')
    .select('id', 'category')
    .orderBy('id')
}
