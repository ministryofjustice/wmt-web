const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

describe('Admin Landing Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })
    it('Should not see Admin in nav', async function () {
      const link = await $('[href="/admin"]')
      const linkExists = await link.isExisting()
      return expect(linkExists).to.be.equal(false)
    })

    it('Should not be able to go on Admin landing page', async function () {
      await navigateTo('/admin')
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

    it('Should not see Admin in nav', async function () {
      const link = await $('[href="/admin"]')
      const linkExists = await link.isExisting()
      return expect(linkExists).to.be.equal(false)
    })

    it('Should not be able to go on Admin landing page', async function () {
      await browser.url('/admin')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
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
    })

    it('Should be able to navigate to admin page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText, 'Admin Page title should be "Admin"').to.equal('Admin')
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
    })

    it('Should be able to navigate to admin page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText, 'Admin Page title should be "Admin"').to.equal('Admin')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
