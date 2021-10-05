const knex = require('../../../knex').web
const { STAFF } = require('../../constants/user-roles')

module.exports = function (username) {
  return knex('user_role')
    .withSchema('app')
    .join('roles', 'roles.id', 'user_role.role_id')
    .join('users', 'users.id', 'user_role.user_id')
    .where('users.username', 'ilike', username)
    .select('roles.id AS roleId', 'roles.role', 'users.name AS fullname')
    .then(function ([role]) {
      return role || { roleId: 0, role: STAFF }
    })
}
