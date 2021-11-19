const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('Workload Points (T2A) Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on Workload Points (T2A) page', async function () {
      await browser.url('/admin/workload-points/t2a')
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

    it('Should not be able to go on Workload Points (T2A) page', async function () {
      await browser.url('/admin/workload-points/t2a')
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
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await workloadPointsLink.click()
    })

    it('Should be able to navigate to Workload Points (T2A) page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Workload Points (T2A)')
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
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await workloadPointsLink.click()
    })

    it('Should be able to navigate to Workload Points (T2A) page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Workload Points (T2A)')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
