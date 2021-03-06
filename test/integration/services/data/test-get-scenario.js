const expect = require('chai').expect

const getScenario = require('../../../../app/services/data/get-scenario')
const getTeam = require('../../../../app/services/data/get-team-by-name')
const getLDU = require('../../../../app/services/data/get-ldu-by-name')
const getRegion = require('../../../../app/services/data/get-region-by-name')

let scenarioData

describe('services/data/get-scenario team', function () {
  before(function () {
    return getTeam('Team 1').then(function (id) {
      return getScenario(id, 'team').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 255 raw scenario records for HMPPS > Region 1 > Probation Delivery Unit 1 > Team 1', function () {
    expect(scenarioData.length).to.eql(255)
  })
})

describe('services/data/get-scenario ldu', function () {
  before(function () {
    return getLDU('LDU Cluster 1').then(function (id) {
      return getScenario(id, 'ldu').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 510 raw scenario records for HMPPS > Region 1 > Probation Delivery Unit 1', function () {
    expect(scenarioData.length).to.eql(510)
  })
})

describe('services/data/get-scenario division', function () {
  before(function () {
    return getRegion('NPS Region 1').then(function (id) {
      return getScenario(id, 'region').then(function (results) {
        scenarioData = results
      })
    })
  })
  it('should retrieve all 510 raw scenario records for HMPPS > Region 1', function () {
    expect(scenarioData.length).to.eql(510)
  })
})
