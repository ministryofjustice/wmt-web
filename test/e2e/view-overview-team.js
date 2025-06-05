const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let teamDefaultUrl
describe('Team', function () {
  describe('View overview for staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(teamDefaultUrl + '/overview')
    })

    it('should navigate to the team overview page', async function () {
      const element = await $('.sln-table-org-level')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('should not include the reductions export for staff at team level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the overview export at team level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download overview', async function () {
      await navigateTo(teamDefaultUrl + '/overview/caseload-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should not be able to download reductions', async function () {
      await navigateTo(teamDefaultUrl + '/overview/reductions-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await navigateTo(teamDefaultUrl + '/overview')
    })

    it('should navigate to the team overview page', async function () {
      const element = await $('.sln-table-org-level')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('should include the reductions export for staff at team level', async function () {
      const reductionExport = await $('.reduction-export')
      await reductionExport.waitForExist({ timeout: 60000 })
      const isVisible = await reductionExport.isDisplayed()
      expect(isVisible, 'Expected .reduction-export to be visible').to.equal(true)
    })

    it('should include the overview export at team level', async function () {
      const reductionExport = await $('.sln-export')
      await reductionExport.waitForExist({ timeout: 60000 })
      const isVisible = await reductionExport.isDisplayed()
      expect(isVisible, 'Expected .reduction-export to be visible').to.equal(true)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo(teamDefaultUrl + '/overview')
    })

    it('should navigate to the team overview page', async function () {
      const element = await $('.sln-table-org-level')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('should not include the reductions export for staff at team level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the overview export at team level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download overview', async function () {
      await navigateTo(teamDefaultUrl + '/overview/caseload-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should not be able to download reductions', async function () {
      await navigateTo(teamDefaultUrl + '/overview/reductions-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await navigateTo(teamDefaultUrl + '/overview')
    })

    it('should navigate to the team overview page', async function () {
      const element = await $('.sln-table-org-level')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('should include the reductions export for staff at team level', async function () {
      const reductionExport = await $('.reduction-export')
      await reductionExport.waitForDisplayed({ timeout: 30000 })
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.true
    })

    it('should include the overview export at team level', async function () {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
