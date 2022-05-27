const knex = require('../../../knex').web

module.exports = function (userId, name) {
  return knex('users')
    .withSchema('app')
    .where('id', userId)
    .update({
      name
    })
}
