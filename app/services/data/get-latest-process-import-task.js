const knex = require('../../../knex').web

module.exports = function () {
  return knex('workload_report')
    .withSchema('app')
    .where('status', 'IN-PROGRESS')
    .first(['effective_from'])
    .select('effective_from')
}
