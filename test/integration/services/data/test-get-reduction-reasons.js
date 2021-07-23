const expect = require('chai').expect

const helper = require('../../../helpers/data/ref-data-helper')
const getReductionReasons = require('../../../../app/services/data/get-reduction-reasons')

let inserts = []

const reductionReasonsRow = {
  category: 'Test Category 1',
  reason: 'Test Reason 1',
  reasonShortName: '1',
  allowancePercentage: 20,
  maxAllowancePercentage: null,
  monthsToExpiry: 6,
  isEnabled: true
}

describe('services/data/get-reduction-reasons', function () {
  before(function () {
    return helper.addReductionsRefData()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should return an array of reductions reasons ref data', function () {
    return getReductionReasons()
      .then(function (results) {
        const expectedId = inserts.find((insert) => insert.table === 'reduction_reason').id
        expect(results).to.deep.contain(Object.assign({}, reductionReasonsRow, { id: expectedId }))
      })
  })

  after(function () {
    return helper.removeInsertedData(inserts)
  })
})
