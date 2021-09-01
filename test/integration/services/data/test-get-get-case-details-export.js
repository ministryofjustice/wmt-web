const expect = require('chai').expect
const getCaseDetailsExport = require('../../../../app/services/data/get-case-details-export')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

let inserts = []
const CASE_DETAILS_TO_INSERT =
  {
    workload_id: 0,
    row_type: 'U', // U = Unpaid work
    case_ref_no: 'X555555',
    tier_code: 3,
    team_code: 'WMT',
    grade_code: 'C',
    location: 'COMMUNITY'
  }

describe('services/data/get-case-details-export', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        CASE_DETAILS_TO_INSERT.workload_id = inserts.filter((item) => item.table === 'workload')[1].id
        return dataHelper.addCaseDetails(CASE_DETAILS_TO_INSERT)
          .then(function (caseDetailInserts) {
            inserts = inserts.concat(caseDetailInserts)
          })
      })
  })

  it('should retrieve all the case details export', function () {
    return getCaseDetailsExport(undefined)
      .then(function (results) {
        expect(results.length).to.be.greaterThan(0)
      })
  })

  it('should retrieve a case details export for a given team', function () {
    return getCaseDetailsExport(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results.length).to.equal(1)
        expect(results[0].teamname).to.equal('Test Team')
        expect(results[0].lduname).to.equal('Test LDU')
        expect(results[0].casetype).to.equal(CASE_DETAILS_TO_INSERT.location)
        expect(results[0].rowtype).to.equal('Row Type Full Name')
        expect(results[0].tiercode).to.equal('Category Name')
        expect(results[0].casereferenceno).to.equal(CASE_DETAILS_TO_INSERT.case_ref_no)
      })
  })

  it('should return empty object for a given invalid team', function () {
    return getCaseDetailsExport(0, 'team')
      .then(function (results) {
        expect(results).to.be.empty //eslint-disable-line
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
