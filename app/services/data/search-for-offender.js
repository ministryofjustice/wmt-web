const knex = require('../../../knex').web

module.exports = function (surname) {
  const columns = [
    'forename',
    'surname',
    'team',
    'ldu',
    'region',
    'workload_owner_id AS workloadOwnerId'
  ]
  return knex('offender_manager_search_view').withSchema('app').columns(columns).where('surname', surname)
}
