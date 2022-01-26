const knex = require('../../../knex').web

module.exports = function (newUserRole) {
  return knex('user_role')
    .withSchema('app')
    .insert({
      user_id: newUserRole.userId,
      role_id: newUserRole.roleId,
      last_updated: newUserRole.lastUpdated,
      last_updated_by: newUserRole.lastUpdatedBy
    })
    .returning('id').then(function ([id]) {
      return id.id
    })
}
