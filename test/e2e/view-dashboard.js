const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

describe('view dashboard reports', function () {
  async function extractFileUrl (row) {
    const fileUrlElement = await row.$('td[headers="link"] a')
    return fileUrlElement.getAttribute('href')
  }

  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await navigateTo('/')
    })

    it('Dashboard tab does not exist on the home page', async function () {
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      const linkExists = await link.isExisting()
      expect(linkExists).to.be.equal(false)
    })

    it('should not be able to go to dashboard page', async function () {
      await navigateTo('/probation/hmpps/0/dashboard')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should not be able to download a dashboard', async function () {
      await navigateTo('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210802062147.txt')
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
      await navigateTo('/')
    })

    it('should display the Dashboard tab on the home page', async function () {
      const selector = '[href="/probation/hmpps/0/dashboard"]'
      const link = await $(selector)

      await link.waitForExist({ timeout: 30000, interval: 500 })
      await link.waitForDisplayed({ timeout: 30000, interval: 500 })

      const isVisible = await link.isDisplayed()
      expect(isVisible).to.equal(true, 'Expected the Dashboard link to be visible')
    })

    it('should be able to navigate to the dashboard page and validate downloads', async function () {
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      await clickAndWaitForPageLoad(link)

      const tableBody = await $('#dashboard-table tbody')
      await tableBody.waitForDisplayed({ timeout: 30000 })

      // eslint-disable-next-line no-undef
      const rows = await $$('//*[@id="dashboard-table"]/tbody/tr')
      expect(rows.length, 'Expected at least 5 dashboard rows').to.be.gte(5)

      const firstRowUrl = await extractFileUrl(rows[0])
      expect(firstRowUrl, 'First dashboard download URL is incorrect')
        .to.include('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_')

      const lastRowUrl = await extractFileUrl(rows[4])
      expect(lastRowUrl, 'Fifth dashboard download URL is incorrect')
        .to.include('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo('/')
    })

    it('Dashboard tab exists on the home page', async function () {
      const selector = '[href="/probation/hmpps/0/dashboard"]'
      const link = await $(selector)

      const appeared = await link.waitForExist({ timeout: 60000 })
      expect(appeared).to.equal(true)

      const isVisible = await link.isDisplayed()
      expect(isVisible).to.equal(true)
    })

    it('should be able to navigate to dashboard page', async function () {
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      await clickAndWaitForPageLoad(link)
      const rows = await browser.findElements('xpath', '//*[@id="dashboard-table"]/tbody/tr')

      expect(rows.length).to.equal(5)

      const firstFileUrl = await extractFileUrl(await $(rows[0]))
      expect(firstFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210802062147.txt')

      const lastFileUrl = await extractFileUrl(await $(rows[4]))
      expect(lastFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210729062147.txt')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await navigateTo('/')
    })

    it('Dashboard tab exists on the home page', async function () {
      const selector = '[href="/probation/hmpps/0/dashboard"]'
      const link = await $(selector)

      const appeared = await link.waitForExist({ timeout: 60000 })
      expect(appeared).to.equal(true)

      const isVisible = await link.isDisplayed()
      expect(isVisible).to.equal(true)
    })

    it('should be able to navigate to dashboard page', async function () {
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      await clickAndWaitForPageLoad(link)
      const rows = await browser.findElements('xpath', '//*[@id="dashboard-table"]/tbody/tr')

      expect(rows.length).to.equal(5)

      const firstFileUrl = await extractFileUrl(await $(rows[0]))
      expect(firstFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210802062147.txt')

      const lastFileUrl = await extractFileUrl(await $(rows[4]))
      expect(lastFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210729062147.txt')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
