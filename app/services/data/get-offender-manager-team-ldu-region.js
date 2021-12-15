const knex = require('../../../knex').web

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
    .withSchema('app')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('ldu', 'team.ldu_id', 'ldu.id')
    .join('region', 'ldu.region_id', 'region.id')
    .first()
    .select('offender_manager.forename', 'offender_manager.surname', 'team.code AS teamCode', 'team.description AS teamDescription', 'ldu.code AS lduCode', 'ldu.description AS lduDescription',
      'region.code AS regionCode', 'region.description AS regionDescription', 'workload_owner.contracted_hours as contractedHours')
    .where('workload_owner.id', workloadOwnerId)
}
