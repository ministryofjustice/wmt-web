const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let nationalDefaultUrl

describe('View reductions export for a System Admin', function () {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.SystemAdmin)
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
        teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
        lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
        nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
        return results
      }).then(function () {
        return browser.url(workloadOwnerDefaultUrl + '/overview').waitForExist('.breadcrumbs')
      })
  })

  it('should include the reductions export for system admin users at team level', function () {
    return browser.url(teamDefaultUrl + '/overview')
      .isExisting('.reduction-export').then(function (exist) {
        expect(exist).to.be.true //eslint-disable-line
      })
  })
  it('should include the reductions export for system admin users at ldu level', function () {
    return browser.url(lduDefaultUrl + '/overview')
      .isExisting('.reduction-export').then(function (exist) {
        expect(exist).to.be.true //eslint-disable-line
      })
  })
  it('should include the reductions export for system admin users at region level', function () {
    return browser.url(lduDefaultUrl + '/overview')
      .isExisting('.reduction-export').then(function (exist) {
        expect(exist).to.be.true //eslint-disable-line
      })
  })
  it('should not include the reductions export for system admin users at workload owner level', function () {
    return browser.url(workloadOwnerDefaultUrl + '/overview')
      .isExisting('.reduction-export').then(function (exist) {
        expect(exist).to.be.false //eslint-disable-line
      })
  })
  it('should not include the reductions export for system admin users at national level', function () {
    return browser.url(nationalDefaultUrl + '/overview')
      .isExisting('.reduction-export').then(function (exist) {
        expect(exist).to.be.false //eslint-disable-line
      })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
