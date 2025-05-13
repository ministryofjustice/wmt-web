const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const aggregatedDataHelper = require('../helpers/data/aggregated-data-helper')
const archiveReductionDataHelper = require('../helpers/data/archive-reduction-data-helper')
const dateFormatter = require('../../app/services/date-formatter')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerId
let archiveReductionId
describe('Admin Archive Data Reductions Page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-data/reductions')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 10000 })
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
      await navigateTo('/archive-data/reductions')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 10000 })
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
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/archive-data/reductions')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 10000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      workloadOwnerId = await aggregatedDataHelper.getAnyExistingWorkloadOwnerId()
      const userId = await aggregatedDataHelper.getAnyExistingUserId()
      archiveReductionId = await archiveReductionDataHelper.createArchiveReductions({
        omName: 'Test_Forename Test_Surname',
        lastUpdatedDate: '01 Jan 2015 00:00:00 GMT',
        hoursReduced: 5,
        comments: 'Test Comment',
        reductionAddedBy: 'Test Added By'
      })
      await aggregatedDataHelper.createReductionForWorkloadOwner(workloadOwnerId, userId)
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const optionslink = await $('[href="/archive-options"]')
      await clickAndWaitForPageLoad(optionslink)
    })

    it('Should be able to navigate to page', async function () {
      const reductionslink = await $('[href="/archive-data/reductions"]')
      await clickAndWaitForPageLoad(reductionslink)
      const pageTitle = await $('.govuk-heading-xl')
      const pageTitleText = await pageTitle.getText()
      expect(pageTitleText).to.equal('Archived Reductions')
    })

    it('Should be able to search', async function () {
      const archiveFromDayField = await $('#archive-from-day')
      const archiveFromMonthField = await $('#archive-from-month')
      const archiveFromYearField = await $('#archive-from-year')
      const archiveToDayField = await $('#archive-to-day')
      const archiveToMonthField = await $('#archive-to-month')
      const archiveToYearField = await $('#archive-to-year')

      await archiveFromDayField.setValue('24')
      await archiveFromMonthField.setValue('10')
      await archiveFromYearField.setValue('2014')
      await archiveToDayField.setValue('22')
      await archiveToMonthField.setValue('2')
      await archiveToYearField.setValue('2022')

      const extraSearchCritera = await $('.select2-search__field')
      await extraSearchCritera.setValue('Test_Forename')

      const criteriaName = await $('#select2-multi-search-field-results li[data-select2-id="16"]')
      await criteriaName.waitForClickable({ timeout: 10000 })
      await clickAndWaitForPageLoad(criteriaName)

      const search = await $('#archive-reductions-filter-submit')
      await clickAndWaitForPageLoad(search)
      await browser.waitUntil(async (resolve) => {
        return (await $('#reduction-archive-table tbody tr:first-child').getText()) !== 'Loading...'
      })

      const firstRow = await $('#reduction-archive-table tbody tr:first-child')
      const firstRowData = await firstRow.$$('td').map(child => child.getText())

      expect(firstRowData).to.have.deep.members([
        '',
        'Test_Forename Test_Surname',
        'Not Available',
        '5',
        'N/A',
        'Test Comment',
        'N/A',
        'N/A',
        '01/01/2015',
        'Test Added By'
      ])

      const secondRow = await $('#reduction-archive-table tbody tr:last-child')
      const secondRowData = await secondRow.$$('td').map(child => child.getText())

      expect(secondRowData).to.have.deep.members([
        '',
        'Test_Forename Test_Surname',
        'Test Team',
        '10',
        'Other',
        '.',
        '01/01/2020',
        '',
        dateFormatter.formatDate(new Date(), 'DD/MM/YYYY'),
        'wmt_super_user'
      ])
    })
    after(async function () {
      await authenticationHelper.logout()
      await archiveReductionDataHelper.deleteArchiveReductionsByIds(archiveReductionId)
      return aggregatedDataHelper.deleteReductionsForWorkloadOwner(workloadOwnerId)
    })

    afterEach(async function () {
      if (this.currentTest.state === 'failed') {
        await browser.saveScreenshot(`./error-screenshots/${this.currentTest.title}.png`)
      }
    })
  })
})
