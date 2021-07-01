const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'contact_cms_export_view AS contactCMS'
  const selectList = [
    'contactRegionName',
    'contactLduName',
    'contactTeamName',
    'contactDate',
    'omContactDate',
    'contactName',
    'contactGradeCode',
    'omRegionName',
    'omLduName',
    'omTeamName',
    'contactCMS.contactId',
    'omName',
    'omGradeCode',
    'contactCMS.contactDescription',
    'contactCMS.contactCode',
    'contactCMS.contactPoints',
    'omCMS.omPoints',
    'contactCMS.caseRefNo',
    'omCMS.caseRefNo AS omCaseRefNo',
    'omCMS.contactDescription AS omContactDescription',
    'omCMS.contactCode AS omContactCode'
  ]

  const table2 = 'om_cms_export_view AS omCMS'


  let query = knex(table)
  .withSchema('app')
  .select(selectList)
  .fullOuterJoin(table2,'contactCMS.contactId','omCMS.contactId')

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    query = query.where(`om${type}`,id).orWhere(`contact${type}`,id)
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
