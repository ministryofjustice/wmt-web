const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'contact_cms_export_view AS contactCMS'
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
    'contactCMS.contactid',
    'omname',
    'omgradecode',
    'contactCMS.contactdescription',
    'contactCMS.contactcode',
    'contactCMS.contactpoints',
    'omCMS.ompoints',
    'contactCMS.caserefno',
    'omCMS.caserefno AS omcaserefno',
    'omCMS.contactdescription AS omcontactdescription',
    'omCMS.contactcode AS omcontactcode'
  ]

  const table2 = 'om_cms_export_view AS omCMS'

  let query = knex(table)
    .withSchema('app')
    .select(selectList)
    .fullOuterJoin(table2, 'contactCMS.contactid', 'omCMS.contactid')

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where(`om${type}id`, id).orWhere(`contact${type}id`, id)
  }

  return query.then(function (results) {
    results.forEach(function (result) {
      if (!result.caseRefNo) {
        result.caseRefNo = result.omCaseRefNo
      }
      if (!result.contactDescription) {
        result.contactDescription = result.omContactDescription
      }
      if (!result.contactCode) {
        result.contactCode = result.omContactCode
      }
      if (!result.contactDate) {
        result.contactDate = result.omContactDate
      }
    })
    return results
  })
}
