const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('View expiring reductions', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await browser.url('/expiring-reductions')
    })

    it('should not be able to go to page', async function () {
      const header = await $('.govuk-heading-xl')
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
      const link = await $('[href="/expiring-reductions"]')
      await link.click()
    })

    it('should navigate to the expiring reductions page', async () => {
      let pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      let pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Expiring Reductions')
      expect(pageSubtitle).to.equal('Expiring Reductions')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/expiring-reductions"]')
      await link.click()
    })

    it('should navigate to the expiring reductions page', async () => {
      let pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      let pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Expiring Reductions')
      expect(pageSubtitle).to.equal('Expiring Reductions')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/expiring-reductions"]')
      await link.click()
      const otherManagerLink = await $('[href="/expiring-reductions-other"]')
      await otherManagerLink.click()
    })

    it('should navigate to the expiring reductions page', async () => {
      let pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      let pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Expiring Reductions')
      expect(pageSubtitle).to.equal('Expiring Reductions')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
