const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

describe('Admin Reduction Reasons Page', () => {
  describe('Staff', function () {
    before(async function () {
      await browser.reloadSession()
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/manage-reduction-reasons')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 10000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Manager', function () {
    before(async function () {
      await browser.reloadSession()
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/manage-reduction-reasons')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 10000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await browser.reloadSession()
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/manage-reduction-reasons"]')
      await clickAndWaitForPageLoad(link)
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Manage Reduction Reasons')
    })

    it('Should not see add reduction reason', async function () {
      const link = await $('[href="/add-reduction-reason"]')
      const linkExists = await link.isExisting()
      return expect(linkExists).to.be.equal(false)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await browser.reloadSession()
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/manage-reduction-reasons"]')
      await clickAndWaitForPageLoad(link)
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Manage Reduction Reasons')
    })

    it('Should see add reduction reason', async function () {
      const link = await $('[href="/add-reduction-reason"]')
      const linkExists = await link.isExisting()
      return expect(linkExists).to.be.equal(true)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
