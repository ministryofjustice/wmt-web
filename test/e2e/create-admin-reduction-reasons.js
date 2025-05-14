const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

describe('Admin Add Reduction Reasons Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/add-reduction-reason')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 60000 })
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
      await navigateTo('/add-reduction-reason')
      const header = $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 50000 })
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

    it('Should not be able to go on page', async function () {
      await navigateTo('/add-reduction-reason')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 60000 })
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
      await clickAndWaitForPageLoad(link)
      link = await $('[href="/manage-reduction-reasons"]')
      await clickAndWaitForPageLoad(link)
      link = await $('[href="/add-reduction-reason"]')
      await clickAndWaitForPageLoad(link)
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 60000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Add Reduction Reason')
    })

    it('Should be able to create a reduction reason', async function () {
      const reductionName = await $('#reductionName')
      await reductionName.setValue('A new reduction')

      const shortReductionName = await $('#reductionShortName')
      await shortReductionName.setValue('new reduction')

      const category = await $('#category')
      await category.selectByVisibleText('Personal Circumstances')

      const status = await $('#isEnabled')
      await status.selectByVisibleText('Enabled')

      const submitButton = await $('#submit-button')
      await submitButton.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      await successBanner.waitForDisplayed({ timeout: 60000 })
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('The Reduction Reason was saved successfully!')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
