const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const workloadTypes = require('../../app/constants/workload-type')

const nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
let pageSubtitle

let national

describe('View national caseload', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Staff)
      await browser.url(nationalDefaultUrl + '/caseload')
    })

    it('with the correct table, breadcrumbs', async () => {
      pageSubtitle = await $('.govuk-heading-xl')
      await pageSubtitle.waitForDisplayed({ timeout: 30000 })
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('National')
    })

    it('should not display export button', async () => {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download export', async function () {
      await browser.url(nationalDefaultUrl + '/caseload/caseload-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should be accessible via the Caseload tab on national overview page', async () => {
      await browser.url(nationalDefaultUrl)
      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await browser.url(nationalDefaultUrl)

      national = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
      await national.click()

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      let grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      national = await $('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      await national.click()

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await national.click()

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await browser.url(nationalDefaultUrl + '/caseload')
    })

    it('should  display export button', async () => {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await browser.url(nationalDefaultUrl + '/caseload')
    })

    it('should not display export button', async () => {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download export', async function () {
      await browser.url(nationalDefaultUrl + '/caseload/caseload-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
      await browser.url(nationalDefaultUrl + '/caseload')
    })

    it('should  display export button', async () => {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })
})
