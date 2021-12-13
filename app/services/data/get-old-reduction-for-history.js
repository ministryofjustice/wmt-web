const knex = require('../../../knex').web

module.exports = function (id) {
  let whereObject = {}
  if (id !== undefined) {
    whereObject = { 'reductions.id': id }
  }

  return knex('reductions')
    .withSchema('app')
    .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
    .where(whereObject)
    .select('reductions.id AS reductionId',
      'reductions.reduction_reason_id AS reductionReasonId',
      'reductions.hours',
      'effective_from AS reductionStartDate',
      'effective_to AS reductionEndDate',
      'reductions.status',
      'reductions.notes',
      'reductions.updated_date AS updatedDate',
      'reductions.user_id AS userId',
      'reduction_reason.reason')
    .then(function (reduction) {
      return reduction[0]
    })
}
