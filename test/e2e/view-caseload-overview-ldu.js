const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl
let lduDefaultUrl

describe('LDU', function () {
  describe('View overview for staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    })

    describe('ldu level', function () {
      beforeEach(async function () {
        await browser.url(workloadOwnerDefaultUrl + '/overview')
        const lduLink = await $('[href="' + lduDefaultUrl + '"]')
        await lduLink.click()
        const lduOverviewLink = await $('[href="' + lduDefaultUrl + '/overview"]')
        await lduOverviewLink.click()
      })

      it('should navigate to the ldu overview page', async function () {
        const element = await $('.sln-table-org-level')
        const text = await element.getText()
        expect(text).to.equal('Team')
      })

      it('should not include the reductions export for staff at ldu level', async function () {
        const reductionExport = await $('.reduction-export')
        const exists = await reductionExport.isExisting()
        return expect(exists).to.be.false
      })
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('overview for managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('overview for Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('overview for Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
