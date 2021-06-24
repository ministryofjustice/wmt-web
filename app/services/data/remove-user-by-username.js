const knex = require('../../../knex').web

module.exports = function (username) {
  if (username === undefined) {
    throw new ReferenceError('Username is not defined')
  }

  return knex('users')
    .withSchema('app')
    .where('username', username)
    .del()
    .then(function (count) {
      return count
    })
}
