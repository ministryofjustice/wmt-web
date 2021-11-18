const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerDefaultUrl
let lduDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + results.filter((item) => item.table === 'ldu')[0].id
  })

  it('should navigate to the ldu caseload capacity screen', async () => {
    await browser.url(workloadOwnerDefaultUrl)
    const overviewLink = await $('[href="' + workloadOwnerDefaultUrl + '/overview"]')
    await overviewLink.click()
    const lduUrl = await $('[href="' + lduDefaultUrl + '"]')
    await lduUrl.click()
    const caseloadCapacityUrl = await $('[href="' + lduDefaultUrl + '/caseload-capacity"]')
    await caseloadCapacityUrl.click()
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Probation Delivery Unit')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('3')
    await fromMonthField.setValue('4')
    await fromYearField.setValue('2017')
    await toDayField.setValue('3')
    await toMonthField.setValue('4')
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
