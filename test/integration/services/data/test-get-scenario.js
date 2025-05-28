const expect = require('chai').expect
const aggregatedDataHelper = require('../../../helpers/data/aggregated-data-helper')
const getScenario = require('../../../../app/services/data/get-scenario')
const getTeam = require('../../../helpers/data/get-team-by-name')
const getLDU = require('../../../helpers/data/get-ldu-by-name')
const getRegion = require('../../../helpers/data/get-region-by-name')

let inserts
describe('services/data/get-scenario team', function () {
  before(function () {
    return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (result) {
      inserts = result
    })
  })
  it.skip('should retrieve all 51 raw scenario records for HMPPS > Region 1 > Probation Delivery Unit 1 > Team 1', function () {
    return getTeam('Test Team').then(function (id) {
      return getScenario(id, 'team').then(function (results) {
        expect(results.length).to.eql(51)
      })
    })
  })
  after(function () {
    return aggregatedDataHelper.removeInsertedData(inserts)
  })
})

describe('services/data/get-scenario ldu', function () {
  before(function () {
    return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (result) {
      inserts = result
    })
  })
  it.skip('should retrieve all 51 raw scenario records for HMPPS > Region 1 > Probation Delivery Unit 1', function () {
    return getLDU('Test LDU').then(function (id) {
      return getScenario(id, 'ldu').then(function (results) {
        expect(results.length).to.eql(51)
      })
    })
  })
  after(function () {
    return aggregatedDataHelper.removeInsertedData(inserts)
  })
})

describe('services/data/get-scenario division', function () {
  before(function () {
    return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (result) {
      inserts = result
    })
  })
  it.skip('should retrieve all 510 raw scenario records for HMPPS > Region 1', function () {
    return getRegion('NPS Test Region').then(function (id) {
      return getScenario(id, 'region').then(function (results) {
        expect(results.length).to.eql(51)
      })
    })
  })
  after(function () {
    return aggregatedDataHelper.removeInsertedData(inserts)
  })
})
