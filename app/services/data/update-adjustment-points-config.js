const knex = require('../../../knex').web
// Data Service to get the CMS or GS config
module.exports = function (adjustment) {
  return knex('adjustment_reason')
    .withSchema('app')
    .update({
      points: adjustment.points
    })
    .where('id', adjustment.adjustmentId)
}
