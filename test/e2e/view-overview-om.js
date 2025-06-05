const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerGrade
let workloadOwnerDefaultUrl
let workloadOwnerCapacity

describe('Offender Manager', function () {
  describe('View overview', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId

      workloadOwnerGrade = await dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
      workloadOwnerCapacity = await dataHelper.selectCapacityForWorkloadOwner(workloadOwnerId)
      await navigateTo(workloadOwnerDefaultUrl + '/overview')
    })

    it('should navigate to the workload owner overview page', async function () {
      let grade = await $('.sln-grade')
      grade = await grade.getText()
      expect(grade).to.equal(workloadOwnerGrade)

      let capacity = await $('.sln-capacity')
      await capacity.waitForDisplayed({ timeout: 30000 })
      capacity = await capacity.getText()
      const capacityPercent = capacity.substring(0, capacity.indexOf('%'))
      expect(capacityPercent).to.equal(`${workloadOwnerCapacity}`)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
