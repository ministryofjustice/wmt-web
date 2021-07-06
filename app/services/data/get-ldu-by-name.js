const knex = require('../../../knex').web

module.exports = function (name) {
  if (name === undefined) {
    throw new ReferenceError('LDU Name is not defined')
  }

  return knex('ldu')
    .withSchema('app')
    .where('description', name)
    .first('id')
    .then(function (ldu) {
      return ldu.id
    })
}
