const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const searchForOffender = require('../../../../app/services/data/search-for-offender')
let inserts = []
describe('services/data/search-for-offender', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (result) {
        inserts = result
      })
  })

  it('should return offender when searching by exact surname', function () {
    return searchForOffender('Test_Surname').then(function ([result]) {
      expect(result.forename).to.equal('Test_Forename')
      expect(result.surname).to.equal('Test_Surname')
    })
  })

  it('should return offender when searching by surname in different case', function () {
    return searchForOffender('TEST_SURNAME').then(function ([result]) {
      expect(result.forename).to.equal('Test_Forename')
      expect(result.surname).to.equal('Test_Surname')
    })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
