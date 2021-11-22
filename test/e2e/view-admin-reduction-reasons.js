const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('Admin Reduction Reasons Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await browser.url('/manage-reduction-reasons')
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
      await browser.url('/manage-reduction-reasons')
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
      await link.click()
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/manage-reduction-reasons"]')
      await link.click()
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
      authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await link.click()
    })

    it('Should be able to navigate to page', async function () {
      const link = await $('[href="/manage-reduction-reasons"]')
      await link.click()
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
      authenticationHelper.logout()
    })
  })
})
