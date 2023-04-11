const knex = require('../../knex').web
const { arrayToPromise } = require('../promise-helper')

module.exports.addReductionsRefData = function () {
  const inserts = []
  const reductionCategories = [
    { category: 'Test Category 1' },
    { category: 'Test Category 2' }
  ]

  return knex('reduction_category').withSchema('app').returning('id').insert(reductionCategories)
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'reduction_category', id })
      })
      const reductionReason = {
        reason: 'Test Reason 1',
        reason_short_name: 1,
        category_id: ids[0].id,
        allowance_percentage: 20,
        months_to_expiry: 6
      }
      return knex('reduction_reason').withSchema('app').returning('id').insert(reductionReason)
        .then(function ([id]) {
          inserts.push({ table: 'reduction_reason', id: id.id })
          return inserts
        })
    })
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return arrayToPromise(inserts, function (insert) {
    return knex(insert.table).withSchema('app').where('id', insert.id).del()
  })
}

module.exports.getMaxReductionReasonId = function () {
  return knex('reduction_reason')
    .withSchema('app')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId
    })
}
