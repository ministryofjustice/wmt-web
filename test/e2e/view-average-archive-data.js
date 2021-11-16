const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

let pageTitle, pageSubtitle

describe('View archive data', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.SuperUser)
  })
  describe('should navigate to the archive page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      const link = await $('[href="/admin"]')
      await link.click()
      const archiveDataLink = await $('[href="/archive-options"]')
      await archiveDataLink.click()

      const dailyCaseloadLink = await $('[href="/archive-data/average-caseload-data"]')
      await dailyCaseloadLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Averaged Caseload Data')
      expect(pageSubtitle).to.equal('Archive Data')

      const archiveFromDay = await $('#archive-from-day')
      const archiveFromMonth = await $('#archive-from-month')
      const archiveFromYear = await $('#archive-from-year')
      const archiveToDay = await $('#archive-to-day')
      const archiveToMonth = await $('#archive-to-month')
      const archiveToYear = await $('#archive-to-year')
      const extraSearchCritera = await $('.select2-search__field')

      await archiveFromDay.setValue('31')
      await archiveFromMonth.setValue('12')
      await archiveFromYear.setValue('2014')
      await archiveToDay.setValue('6')
      await archiveToMonth.setValue('1')
      await archiveToYear.setValue('2015')
      await extraSearchCritera.setValue('t')

      const criteriaName = await $('#select2-multi-search-field-results li[data-select2-id="5"]')
      await criteriaName.click()

      const searchButton = await $('#archive-average-filter-submit')

      await searchButton.click()

      const tableData = await browser.findElements('xpath', '//*[@id="average-caseload-table"]/tbody/tr/td[position()=6]')

      const nameElement = await $(tableData[0])
      const nameElementValue = await nameElement.getText()
      expect(nameElementValue).to.equal('Test_forename Test_surname')
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
