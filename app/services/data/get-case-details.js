const knex = require('../../../knex').web

module.exports = function (id) {
  const selectList = [
    'tiercode as tierCode',
    'rowtype as rowType',
    'casereferenceno as caseReferenceNo',
    'casetype as caseType',
    'incustody as inCustody',
    'registerlevel as registerLevel',
    'registercategory as registerCategory',
    'registercategorydescription as registerCategoryDescription',
    'registrationdate as registrationDate'
  ]

  return knex('case_details_view')
    .withSchema('app')
    .columns(selectList)
    .where('workloadownerid', id)
    .then(function (results) {
      if (results.length > 0) {
        results.forEach(function (result) {
          formatSuspendedLiferFields(result)
        })
      }
      return results
    })
}

const formatSuspendedLiferFields = function (result) {
  if (result.rowType !== 'Suspended Lifer') {
    result.inCustody = 'N/A'
    result.registerLevel = 'N/A'
    result.registerCategory = 'N/A'
    result.registerCategoryDescription = 'N/A'
    result.registrationDate = 'N/A'
  } else {
    if (result.inCustody === 'N') {
      result.inCustody = 'No'
    } else if (result.inCustody === 'Y') {
      result.inCustody = 'Yes'
    }
    if (result.registrationDate) {
      const newDate = new Date(result.registrationDate)
      const year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      const dt = newDate.getDate()
      if (month < 10) {
        month = '0' + month
      }
      result.registrationDate = dt + '/' + month + '/' + year
    }
  }
}
