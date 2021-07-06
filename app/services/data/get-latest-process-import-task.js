const knex = require('../../../knex').web

module.exports = function () {
  return knex('tasks')
    .withSchema('app')
    .where('type', 'PROCESS-IMPORT')
    .first(['date_created', 'date_processed', 'date_started'])
    .orderBy('date_created', 'desc')
}
