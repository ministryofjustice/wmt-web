const knex = require('../../../knex').web

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
    .withSchema('app')
    .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
    .where('workload_owner.id', workloadOwnerId)
    .select(
      'workload_owner.team_id AS team_id',
      'workload_owner.id AS workload_owner_id',
      'offender_manager.forename AS offender_manager_forename',
      'offender_manager.surname AS offender_manager_surname')
    .first()
}
