const knex = require('../../knex').integrationTests
const { arrayToPromise } = require('../promise-helper')

const addUserRoleData = function (userId, roleId) {
  const insertedData = []

  const userRole = {
    user_id: userId,
    role_id: roleId,
    last_updated: new Date(),
    last_updated_by: userId
  }

  return knex('user_role').withSchema('app').returning('id').insert(userRole)
    .then(function (ids) {
      ids.forEach((id) => {
        insertedData.push({ table: 'user_role', id: id })
      })
      return insertedData
    })
}

module.exports.addUserRoleData = addUserRoleData

module.exports.addUsers = function () {
  const inserts = []

  const users = [
    { username: 'testusername1', name: 'Test User' }
  ]

  return knex('users').withSchema('app').returning(['id', 'username', 'name']).insert(users)
    .then(function (result) {
      result.forEach((user) => {
        inserts.push({ table: 'users', id: user.id, username: user.username, name: user.name })
      })
      return inserts
    })
}

module.exports.addRoles = function () {
  const inserts = []

  const roles = [
    { role: 'Test_Role1' },
    { role: 'Test_Role2' }
  ]

  return knex('roles').withSchema('app').returning('id').insert(roles)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'roles', id: id })
      })
      return inserts
    })
}

module.exports.addUserAndRole = function (testUser, role) {
  const inserts = []

  return knex('users').withSchema('app').returning(['id', 'username', 'name']).insert({ username: testUser, name: testUser })
    .then(function (result) {
      inserts.push({ table: 'users', id: result[0].id, username: result[0].username, name: result[0].name })
      if (!role) {
        return inserts
      }
      return addUserRoleData(result[0].id, role).then(function (insertedRole) {
        return inserts.concat(insertedRole)
      })
    })
}

module.exports.getAnyExistingUsernameWithExistingRole = function () {
  return knex('users')
    .withSchema('app')
    .join('user_role', 'user_role.user_id', 'users.id')
    .first('users.username')
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return arrayToPromise(inserts, function (insert) {
    return knex(insert.table).withSchema('app').where('id', insert.id).del()
  })
}
