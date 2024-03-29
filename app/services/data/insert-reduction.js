const knex = require('../../../knex').web

module.exports = function (id, newReduction) {
  return knex('reductions')
    .withSchema('app')
    .insert({
      reduction_reason_id: newReduction.reasonForReductionId,
      workload_owner_id: id,
      hours: newReduction.hours,
      effective_from: newReduction.reductionStartDate,
      effective_to: newReduction.reductionEndDate,
      notes: newReduction.notes,
      status: newReduction.status,
      user_id: newReduction.reductionSubmitter
    })
    .returning('id')
    .then(function ([id]) {
      return id.id
    })
}
