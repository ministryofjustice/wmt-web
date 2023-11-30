const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('Admin Archive Data Daily Caseload Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await browser.url('/archive-data/daily-caseload-data')
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
      await browser.url('/archive-data/daily-caseload-data')
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
      const optionslink = await $('[href="/archive-options"]')
      await optionslink.click()
      const caseloadlink = await $('[href="/archive-data/daily-caseload-data"]')
      await caseloadlink.click()
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Daily Caseload Data')
    })

    it('should not show the export button', async function () {
      const exportButton = await $('#archive-csv-submit')
      const buttonExists = await exportButton.isExisting()
      return expect(buttonExists).to.equal(false)
    })

    it('should be able to search', async function () {
      const archiveFromDayField = await $('#archive-from-day')
      const archiveFromMonthField = await $('#archive-from-month')
      const archiveFromYearField = await $('#archive-from-year')
      const archiveToDayField = await $('#archive-to-day')
      const archiveToMonthField = await $('#archive-to-month')
      const archiveToYearField = await $('#archive-to-year')

      await archiveFromDayField.setValue('18')
      await archiveFromMonthField.setValue('6')
      await archiveFromYearField.setValue('2014')
      await archiveToDayField.setValue('10')
      await archiveToMonthField.setValue('2')
      await archiveToYearField.setValue('2017')

      const extraSearchCritera = await $('.select2-search__field')
      await extraSearchCritera.setValue('Test_Forename')

      const criteriaName = await $('#select2-multi-search-field-results li[data-select2-id="15"]')
      await criteriaName.click()

      const search = await $('#archive-filter-submit')
      await search.click()

      const tableData = await browser.findElements('xpath', '//*[@id="daily-caseload-table"]/tbody/tr/td[position()=5]')

      const nameElement = await $(tableData[0])
      const nameElementValue = await nameElement.getText()
      expect(nameElementValue).to.equal('Test_Forename Test_Surname')
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
      const optionslink = await $('[href="/archive-options"]')
      await optionslink.click()
      const caseloadlink = await $('[href="/archive-data/daily-caseload-data"]')
      await caseloadlink.click()
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Daily Caseload Data')
    })

    it('should show the export button', async function () {
      const exportButton = await $('#archive-csv-submit')
      const buttonExists = await exportButton.isExisting()
      return expect(buttonExists).to.equal(true)
    })

    it('should be able to search', async function () {
      const archiveFromDayField = await $('#archive-from-day')
      const archiveFromMonthField = await $('#archive-from-month')
      const archiveFromYearField = await $('#archive-from-year')
      const archiveToDayField = await $('#archive-to-day')
      const archiveToMonthField = await $('#archive-to-month')
      const archiveToYearField = await $('#archive-to-year')

      await archiveFromDayField.setValue('18')
      await archiveFromMonthField.setValue('6')
      await archiveFromYearField.setValue('2014')
      await archiveToDayField.setValue('10')
      await archiveToMonthField.setValue('2')
      await archiveToYearField.setValue('2017')

      const extraSearchCritera = await $('.select2-search__field')
      await extraSearchCritera.setValue('Test_Forename')

      const criteriaName = await $('#select2-multi-search-field-results li[data-select2-id="16"]')
      await criteriaName.click()

      const search = await $('#archive-filter-submit')
      await search.click()

      const tableData = await browser.findElements('xpath', '//*[@id="daily-caseload-table"]/tbody/tr/td[position()=5]')

      const nameElement = await $(tableData[0])
      const nameElementValue = await nameElement.getText()
      expect(nameElementValue).to.equal('Test_Forename Test_Surname')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
