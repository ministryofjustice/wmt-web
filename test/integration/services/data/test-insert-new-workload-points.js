const expect = require('chai').expect

const insertWorkloadPoints = require('../../../../app/services/data/insert-workload-points')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

const workloadPointsResult = []

const defaultWorkloadPoints = {
  commA3: 206,
  commA2: 158,
  commA1: 146,
  commA0: 110,
  commB3: 146,
  commB2: 115,
  commB1: 102,
  commB0: 72,
  commC3: 79,
  commC2: 63,
  commC1: 50,
  commC0: 35,
  commD3: 51,
  commD2: 41,
  commD1: 29,
  commD0: 29,
  cusA3: 75,
  cusA2: 60,
  cusA1: 59,
  cusA0: 0,
  cusB3: 59,
  cusB2: 48,
  cusB1: 47,
  cusB0: 0,
  cusC3: 30,
  cusC2: 24,
  cusC1: 23,
  cusC0: 0,
  cusD3: 17,
  cusD2: 14,
  cusD1: 13,
  cusD0: 0,
  licA3: 219,
  licA2: 175,
  licA1: 163,
  licA0: 0,
  licB3: 161,
  licB2: 132,
  licB1: 119,
  licB0: 0,
  licC3: 77,
  licC2: 65,
  licC1: 52,
  licC0: 0,
  licD3: 51,
  licD2: 43,
  licD1: 31,
  licD0: 0,
  sdr: 4,
  userId: 35,
  sdrConversion: 5,
  nominalTargetPso: 1234,
  nominalTargetPo: 5678,
  defaultContractedHoursPo: 37,
  defaultContractedHoursPso: 38,
  weightingOverdue: 10,
  weightingWarrants: 20,
  weightingUpw: 70,
  parom: 99,
  effectiveTo: null,
  isT2A: false,
  defaultContractedHoursSpo: 0
}

const defaultWorkloadPointsT2A = Object.assign({}, defaultWorkloadPoints, { isT2A: true })

describe('services/data/insert-new-workload-points', function () {
  it('should return an id when a valid workload points object has been added, and the row should exist in the DB', function () {
    return insertWorkloadPoints(defaultWorkloadPoints)
      .then(function (id) {
        workloadPointsResult.push({ table: 'workload_points', id })
        expect(id).to.be.a('number')
        return dataHelper.getAllWorkloadPointsForTest()
          .then(function (workloadPoints) {
            expect(workloadPoints).to.deep.contain(defaultWorkloadPoints)
          })
      })
  })

  it('should return an id when a valid t2a workload points object has been added, and the row should exist in the DB', function () {
    return insertWorkloadPoints(defaultWorkloadPointsT2A)
      .then(function (id) {
        workloadPointsResult.push({ table: 'workload_points', id: id[0] })
        expect(id[0]).to.be.a('number')
        return dataHelper.getAllWorkloadPointsForTest()
          .then(function (workloadPoints) {
            expect(workloadPoints).to.deep.contain(defaultWorkloadPointsT2A)
          })
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(workloadPointsResult)
  })
})
