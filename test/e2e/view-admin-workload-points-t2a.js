const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

describe('Workload Points (T2A) Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on Workload Points (T2A) page', async function () {
      await navigateTo('/admin/workload-points/t2a')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    it('Should not be able to access the Workload Points (T2A) page', async function () {
      await navigateTo('/admin/workload-points/t2a')
      const header = await $('.govuk-heading-xl')
      await header.waitForExist({ timeout: 10000 })
      const isDisplayed = await header.isDisplayed()
      expect(isDisplayed).to.equal(true)
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await clickAndWaitForPageLoad(workloadPointsLink)
    })

    it('Should be able to navigate to Workload Points (T2A) page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Workload Points (T2A)')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await clickAndWaitForPageLoad(workloadPointsLink)
    })

    it('Should be able to navigate to Workload Points (T2A) page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Workload Points (T2A)')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
