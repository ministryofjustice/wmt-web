const knex = require('../../../knex').web

module.exports = function (id) {
  if (id === undefined) {
    throw new ReferenceError('User id is not defined')
  }

  return knex('users')
    .withSchema('app')
    .where('id', id)
    .select('username',
      'name')
    .then(function (user) {
      return user[0]
    })
}
