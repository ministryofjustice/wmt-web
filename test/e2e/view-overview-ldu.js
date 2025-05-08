const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerIds = []
let lduDefaultUrl

describe('LDU Overview Page', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    const lduId = workloadOwnerIds.find(item => item.table === 'ldu').id
    lduDefaultUrl = `/${workloadTypes.PROBATION}/ldu/${lduId}`
    await authenticationHelper.logout()
  })

  describe('as Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await navigateTo(`${lduDefaultUrl}/overview`)
    })

    after(async function () {
      await authenticationHelper.logout()
    })

    it('should navigate to the LDU overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Team')
    })

    it('should not show reductions export', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.equal(false)
    })

    it('should not show overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      expect(exists).to.equal(false)
    })

    it('should block overview CSV download', async function () {
      await navigateTo(`${lduDefaultUrl}/overview/caseload-csv`)
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should block reductions CSV download', async function () {
      await navigateTo(`${lduDefaultUrl}/overview/reductions-csv`)
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
  })

  describe('as Manager', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await navigateTo(`${lduDefaultUrl}/overview`)
    })

    after(async function () {
      await authenticationHelper.logout()
    })

    it('should navigate to the LDU overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Team')
    })

    it('should show reductions export', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.equal(false)
    })

    it('should show overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      expect(exists).to.equal(false)
    })
  })

  describe('as Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo(`${lduDefaultUrl}/overview`)
    })

    after(async function () {
      await authenticationHelper.logout()
    })

    it('should navigate to the LDU overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Team')
    })

    it('should not show reductions export', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.equal(false)
    })

    it('should not show overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      expect(exists).to.equal(false)
    })

    it('should block overview CSV download', async function () {
      await navigateTo(`${lduDefaultUrl}/overview/caseload-csv`)
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should block reductions CSV download', async function () {
      await navigateTo(`${lduDefaultUrl}/overview/reductions-csv`)
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
  })

  describe('as Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await navigateTo(`${lduDefaultUrl}/overview`)
    })

    after(async function () {
      await authenticationHelper.logout()
    })

    it('should navigate to the LDU overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Team')
    })

    it('should show reductions export', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      expect(exists).to.equal(false)
    })

    it('should show overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      expect(exists).to.equal(false)
    })
  })
})
