const knex = require('../../../knex').web

module.exports = function (workloadPointsId) {
  return knex('workload_points')
    .withSchema('app')
    .where('id', workloadPointsId)
    .update({
      effective_to: knex.fn.now()
    })
    .returning('id')
    .then(function ([id]) {
      return id.id
    })
}
