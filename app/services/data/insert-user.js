const knex = require('../../../knex').web

module.exports = function (username, name) {
  return knex('users')
    .withSchema('app')
    .insert({
      username: username,
      name: name
    })
    .returning('id').then(function (ids) {
      return ids[0]
    })
}
