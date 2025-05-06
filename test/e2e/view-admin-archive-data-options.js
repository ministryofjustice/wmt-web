const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')
describe('Admin Archive Data Options Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-options')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-options')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/archive-options"]')
      await clickAndWaitForPageLoad(link)
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Archive Data Options')
    })

    it('Should not see archive reductions', async function () {
      const link = await $('[href="/archive-data/reductions"]')
      const linkExists = await link.isExisting()
      return expect(linkExists).to.be.equal(false)
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/archive-options"]')
      await clickAndWaitForPageLoad(link)
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Archive Data Options')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
