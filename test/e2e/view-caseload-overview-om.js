const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerGrade
let workloadOwnerDefaultUrl

describe('Offender Manager', function () {
  describe('View overview', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId

      workloadOwnerGrade = await dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
      await browser.url(workloadOwnerDefaultUrl + '/overview')
    })

    it('should navigate to the workload owner overview page', async function () {
      let grade = await $('.sln-grade')
      grade = await grade.getText()
      expect(grade).to.equal(workloadOwnerGrade)
    })

    it('should not include the reductions export for staff at workload owner level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
