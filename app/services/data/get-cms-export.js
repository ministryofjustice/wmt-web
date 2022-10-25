const knex = require('../../../knex').web

module.exports = function (id, type) {
  const selectList = [
    'contactregionname',
    'contactlduname',
    'contactteamname',
    'contactdate',
    'omcontactdate',
    'contactname',
    'contactgradecode',
    'omregionname',
    'omlduname',
    'omteamname',
    'contactid',
    'omname',
    'omgradecode',
    'contactdescription',
    'contactcode',
    'contactpoints',
    'ompoints',
    'caserefno',
    'omcaserefno',
    'omcontactdescription',
    'omcontactcode'
  ]

  let query = knex('cms_export_view')
    .withSchema('app')
    .select(selectList)

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where(`om${type}id`, id).orWhere(`contact${type}id`, id)
  }

  return query.then(function (results) {
    results.forEach(function (result) {
      if (!result.caserefno) {
        result.caserefno = result.omcaserefno
      }
      if (!result.contactdescription) {
        result.contactdescription = result.omcontactdescription
      }
      if (!result.contactcode) {
        result.contactcode = result.omcontactcode
      }
      if (!result.contactdate) {
        result.contactdate = result.omcontactdate
      }
    })
    return results
  })
}
