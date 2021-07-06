const knex = require('../../../knex').web

module.exports = function (id, hours) {
  return knex('workload_owner').withSchema('app').where('id', id)
    .update({ contracted_hours: hours })
}
