const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

let regionDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + results.filter((item) => item.table === 'region')[0].id
  })

  it('should navigate to the region caseload capacity screen', async () => {
    await navigateTo('/')
    const regionLink = await $('[href="' + regionDefaultUrl + '"]')
    await clickAndWaitForPageLoad(regionLink)
    const regionCasloadLink = await $('[href="' + regionDefaultUrl + '/caseload-capacity"]')
    await clickAndWaitForPageLoad(regionCasloadLink)
    pageSubtitle = await $('.govuk-heading-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal(dailyArchiveData.regionName)

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('4')
    await fromMonthField.setValue('5')
    await fromYearField.setValue('2017')
    await toDayField.setValue('4')
    await toMonthField.setValue('5')
    await toYearField.setValue('2018')

    await clickAndWaitForPageLoad(submit)

    const errorMessage = await $('.govuk-error-message')
    const errorText = await errorMessage.getText()
    expect(errorText).to.equal('There is no data for this period (// - //)')
    const errorSummary = await $('.govuk-error-summary')
    const exists = await errorSummary.isExisting()
    expect(exists).to.be.equal(false)
  })

  after(function () {
    authenticationHelper.logout()
  })
})
