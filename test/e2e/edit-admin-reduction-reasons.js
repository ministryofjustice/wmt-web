const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

describe('Admin Add Reduction Reasons Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/edit-reduction-reason?id=6')
      const header = $('.govuk-heading-xl')
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

    it('Should not be able to go on page', async function () {
      await navigateTo('/edit-reduction-reason?id=6')
      const header = $('.govuk-heading-xl')
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
      const link = $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/edit-reduction-reason?id=6')
      const header = $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      let link = $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      link = $('[href="/manage-reduction-reasons"]')
      await clickAndWaitForPageLoad(link)
      link = $('[href="/edit-reduction-reason?id=6"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Edit Reduction Reason')
    })

    it('Should be able to edit a reduction reason', async function () {
      const reductionName = $('#reductionName')
      await reductionName.setValue('Edited reduction reason')

      const submitButton = $('#submit-button')
      await clickAndWaitForPageLoad(submitButton)

      const successBanner = $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      await successBanner.waitForDisplayed({ timeout: 30000 })
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('The Reduction Reason was saved successfully!')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
