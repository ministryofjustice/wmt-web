const knex = require('../../../knex').web

module.exports = function (username, name) {
  return knex('users')
    .withSchema('app')
    .insert({
      username,
      name
    })
    .returning('id').then(function ([id]) {
      return id.id
    })
}
