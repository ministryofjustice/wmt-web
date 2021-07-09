const shelljs = require('shelljs')
const expect = require('chai').expect
const aggregatedDataHelper = require('../helpers/data/aggregated-data-helper')

let inserts
describe('accessibility/pa11y', function () {
  before(function () {
    return aggregatedDataHelper.addWorkloadCapacitiesForOffenderManager().then(function (result) {
      inserts = result
    })
  })
  const pathToScript = './test/accessibility/run-pa11y.sh'
  it('should run accessiblity tests', function () {
    const offenderManagerId = inserts.find((item) => item.table === 'workload_owner').id
    const teamId = inserts.find((item) => item.table === 'team').id
    const lduId = inserts.find((item) => item.table === 'ldu').id
    const regionId = inserts.find((item) => item.table === 'region').id
    const courtReporterId = inserts.find((item) => item.table === 'workload_owner').id
    const cmd = pathToScript + ' ' + regionId + ' ' + lduId + ' ' + teamId + ' ' + offenderManagerId + ' ' + courtReporterId
    expect(shelljs.exec(cmd).code).to.eql(0)
  })
  after(function () {
    return aggregatedDataHelper.removeInsertedData(inserts)
  })
})
