const knex = require('../../../knex').web

module.exports = function (userId, roleId, updatedBy) {
  if (userId === undefined) {
    throw new ReferenceError('User id is not defined')
  } else if (roleId === undefined) {
    throw new ReferenceError('Role id is not defined')
  } else if (updatedBy === undefined) {
    throw new ReferenceError('Updated by is not defined')
  }

  return knex('user_role')
    .withSchema('app')
    .where('user_id', userId)
    .update({
      role_id: roleId,
      last_updated: knex.fn.now(),
      last_updated_by: updatedBy
    })
    .returning('id').then(function (ids) {
      return ids[0]
    })
}
