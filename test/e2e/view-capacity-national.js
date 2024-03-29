const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadTypes = require('../../app/constants/workload-type')

let nationalDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow at national level', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0/caseload-capacity'
  })

  it('should navigate to the national caseload capacity screen', async () => {
    await browser.url('/')
    const nationalCaseloadLink = await $('[href="' + nationalDefaultUrl + '"]')
    await nationalCaseloadLink.click()
    pageSubtitle = await $('.govuk-heading-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('National')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('5')
    await fromMonthField.setValue('6')
    await fromYearField.setValue('2017')
    await toDayField.setValue('5')
    await toMonthField.setValue('6')
    await toYearField.setValue('2018')

    await submit.click()

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
