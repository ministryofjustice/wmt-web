const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerDefaultUrl
let teamDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()

    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
  })

  it('should navigate to the team caseload capacity screen', async () => {
    await browser.url(workloadOwnerDefaultUrl)
    const teamLink = await $('[href="' + teamDefaultUrl + '"]')
    await teamLink.click()
    const teamCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
    await teamCapacityLink.click()
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Team')

    const fromDayField = await $('#capacity-from-day')
    const fromMonthField = await $('#capacity-from-month')
    const fromYearField = await $('#capacity-from-year')
    const toDayField = await $('#capacity-to-day')
    const toMonthField = await $('#capacity-to-month')
    const toYearField = await $('#capacity-to-year')
    const submit = await $('#caseload-filter-submit')

    await fromDayField.setValue('2')
    await fromMonthField.setValue('3')
    await fromYearField.setValue('2017')
    await toDayField.setValue('2')
    await toMonthField.setValue('3')
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
