const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
    await navigateTo(workloadOwnerDefaultUrl)
  })

  it('should navigate to the workload owner caseload capacity screen', async () => {
    const link = await $('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
    await clickAndWaitForPageLoad(link)
    pageSubtitle = await $('.govuk-heading-xl')
    await pageSubtitle.waitForDisplayed({ timeout: 60000 })
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal(dailyArchiveData.omNameDisplayed)

    const errorMessage = await $('.govuk-error-message')
    await errorMessage.waitForDisplayed({ timeout: 60000 })
    const errorText = await errorMessage.getText()
    expect(errorText).to.equal('There is no data for this period (// - //)')
  })

  after(function () {
    authenticationHelper.logout()
  })
})
