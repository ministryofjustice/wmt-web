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
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      await link.waitForDisplayed({ timeout: 30000 })
      const isVisible = await link.isDisplayed()
      expect(isVisible).to.equal(true)
    })

    it('should be able to navigate to the dashboard page and validate downloads', async function () {
      const link = await $('[href="/probation/hmpps/0/dashboard"]')
      await link.waitForDisplayed({ timeout: 30000 })
      await clickAndWaitForPageLoad(link)

      const tableBody = await $('#dashboard-table tbody')
      await tableBody.waitForDisplayed({ timeout: 30000 })

      // eslint-disable-next-line no-undef
      const rows = await $$('//*[@id="dashboard-table"]/tbody/tr')
      expect(rows.length).to.be.gte(5)

      const firstRowUrl = await extractFileUrl(rows[0])
      expect(firstRowUrl)
        .to.include('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_')

      const lastRowUrl = await extractFileUrl(rows[4])
      expect(lastRowUrl)
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
      await link.waitForDisplayed({ timeout: 30000 })
      await clickAndWaitForPageLoad(link)
      const rows = await browser.findElements('xpath', '//*[@id="dashboard-table"]/tbody/tr')

      expect(rows.length).to.equal(5)

      const links = await browser.$$('a[href*="/dashboard/download?id="]')
      expect(links.length).to.be.greaterThan(0)
      const href = await links[0].getAttribute('href')
      const base = browser.options.baseUrl || process.env.BASE_URL || 'http://localhost:3000'
      const url = new URL(href, base)
      const ids = url.searchParams.getAll('id')
      expect(ids.length).to.be.greaterThan(0)
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
      await link.waitForDisplayed({ timeout: 30000 })
      await clickAndWaitForPageLoad(link)
      const rows = await browser.findElements('xpath', '//*[@id="dashboard-table"]/tbody/tr')

      expect(rows.length).to.equal(5)

      const links = await browser.$$('a[href*="/dashboard/download?id="]')
      expect(links.length).to.be.greaterThan(0)
      const href = await links[0].getAttribute('href')
      const base = browser.options.baseUrl || process.env.BASE_URL || 'http://localhost:3000'
      const url = new URL(href, base)
      const ids = url.searchParams.getAll('id')
      expect(ids.length).to.be.greaterThan(0)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
