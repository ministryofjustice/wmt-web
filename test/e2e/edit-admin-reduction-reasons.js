const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('Admin Add Reduction Reasons Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await browser.url('/edit-reduction-reason?id=6')
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
      await browser.url('/edit-reduction-reason?id=6')
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

    it('Should not be able to go on page', async function () {
      await browser.url('/edit-reduction-reason?id=6')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      let link = await $('[href="/admin"]')
      await link.click()
      link = await $('[href="/manage-reduction-reasons"]')
      await link.click()
      link = await $('[href="/edit-reduction-reason?id=6"]')
      await link.click()
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Edit Reduction Reason')
    })

    it('Should be able to edit a reduction reason', async function () {
      const reductionName = await $('#reductionName')
      await reductionName.setValue('Edited reduction reason')

      const submitButton = await $('#submit-button')
      await submitButton.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('The Reduction Reason was saved successfully!')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
