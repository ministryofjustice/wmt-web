const knex = require('../../../knex').web

module.exports = function (reductionId, reductionStatus) {
  return knex('reductions')
    .withSchema('app')
    .update({
      status: reductionStatus
    })
    .where('id', reductionId)
    .returning('id')
    .then(function ([id]) {
      return id.id
    })
}
