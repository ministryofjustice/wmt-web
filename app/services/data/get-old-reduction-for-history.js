const knex = require('../../../knex').web

module.exports = function (id) {
  const whereObject = { 'reductions.id': id }

  return knex('reductions')
    .withSchema('app')
    .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
    .where(whereObject)
    .select('reductions.id AS reductionId',
      'reductions.reduction_reason_id AS reductionReasonId',
      'reductions.hours',
      'reductions.effective_from AS reductionStartDate',
      'reductions.effective_to AS reductionEndDate',
      'reductions.status',
      'reductions.notes',
      'reductions.updated_date AS updatedDate',
      'reductions.user_id AS userId',
      'reduction_reason.reason')
    .first()
}
