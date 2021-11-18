const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl

let regionDefaultUrl

describe('Region', function () {
  describe('View overview for staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    })

    describe('region level', function () {
      beforeEach(async function () {
        await browser.url(workloadOwnerDefaultUrl + '/overview')
        const regionLink = await $('[href="' + regionDefaultUrl + '"]')
        await regionLink.click()
      })

      it('should navigate to the region overview page', async function () {
        const element = await $('.sln-table-org-level')
        const text = await element.getText()
        expect(text).to.equal('Probation Delivery Unit')
      })

      it('should not include the reductions export at region level', async function () {
        const reductionExport = await $('.reduction-export')
        const exists = await reductionExport.isExisting()
        return expect(exists).to.be.false
      })

      it('should not include the overview export at national level', async function () {
        const exportButton = await $('.sln-export')
        const exists = await exportButton.isExisting()
        return expect(exists).to.be.false
      })

      it('should not be able to download overview', async function () {
        await browser.url(regionDefaultUrl + '/overview/caseload-csv')
        const header = await $('govuk-heading-xl')
        const text = await header.getText()
        expect(text).to.equal('Access is denied')
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

    describe('regional level', function () {
      before(async function () {
        await browser.url(regionDefaultUrl + '/overview')
      })

      it('should not include the overview export', async function () {
        const exportButton = await $('.sln-export')
        const exists = await exportButton.isExisting()
        return expect(exists).to.be.false
      })

      it('should not be able to download overview', async function () {
        await browser.url(regionDefaultUrl + '/overview/caseload-csv')
        const header = await $('govuk-heading-xl')
        const text = await header.getText()
        expect(text).to.equal('Access is denied')
      })
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
