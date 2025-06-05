const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

describe('Admin Archive Data Averaged Caseload Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-data/average-caseload-data')
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
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-data/average-caseload-data')
      const header = await $('.govuk-heading-xl')
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
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const optionslink = await $('[href="/archive-options"]')
      await clickAndWaitForPageLoad(optionslink)
      const caseloadlink = await $('[href="/archive-data/average-caseload-data"]')
      await clickAndWaitForPageLoad(caseloadlink)
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Averaged Caseload Data')
    })

    it('should not show the export button', async function () {
      const exportButton = await $('#archive-average-csv-submit')
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

      const resultList = await $('#select2-multi-search-field-results')
      await resultList.waitForDisplayed({ timeout: 5000 })

      const criteriaName = await resultList.$('li*=Test_Forename Test_Surname')
      await clickAndWaitForPageLoad(criteriaName)

      const search = await $('#archive-average-filter-submit')
      await clickAndWaitForPageLoad(search)

      const firstRow = await $('#average-caseload-table tbody tr:first-child')

      const firstRowData = await firstRow.$$('td').map(child => child.getText())

      expect(firstRowData).to.have.deep.members([
        '18-06-2014',
        '24-06-2014',
        'NPS Test Region',
        'Test LDU',
        'Test Team',
        'Test_Forename Test_Surname',
        'PO',
        '0',
        '0.00%',
        '0',
        '0',
        '0',
        '0.00%',
        '0',
        '0.00%'
      ])
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const optionslink = await $('[href="/archive-options"]')
      await clickAndWaitForPageLoad(optionslink)
      const caseloadlink = await $('[href="/archive-data/average-caseload-data"]')
      await clickAndWaitForPageLoad(caseloadlink)
    })

    it('Should be able to navigate to page', async function () {
      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Averaged Caseload Data')
    })

    it('should show the export button', async function () {
      const exportButton = await $('#archive-average-csv-submit')
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
      const search = await $('#archive-average-filter-submit')

      await archiveFromDayField.setValue('18')
      await archiveFromMonthField.setValue('6')
      await archiveFromYearField.setValue('2014')
      await archiveToDayField.setValue('10')
      await archiveToMonthField.setValue('2')
      await archiveToYearField.setValue('2017')

      const extraSearchCritera = await $('.select2-search__field')
      await extraSearchCritera.setValue('Test_Forename')

      const resultList = await $('#select2-multi-search-field-results')
      await resultList.waitForDisplayed({ timeout: 5000 })

      const criteriaName = await resultList.$('li*=Test_Forename Test_Surname')
      await clickAndWaitForPageLoad(criteriaName)

      await clickAndWaitForPageLoad(search)

      const firstRow = await $('#average-caseload-table tbody tr:first-child')

      const firstRowData = await firstRow.$$('td').map(child => child.getText())

      expect(firstRowData).to.have.deep.members([
        '18-06-2014',
        '24-06-2014',
        'NPS Test Region',
        'Test LDU',
        'Test Team',
        'Test_Forename Test_Surname',
        'PO',
        '0',
        '0.00%',
        '0',
        '0',
        '0',
        '0.00%',
        '0',
        '0.00%'
      ])
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
