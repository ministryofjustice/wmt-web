const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerDefaultUrl
let pageSubtitle

describe('View your caseload capacity flow', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
    await browser.url(workloadOwnerDefaultUrl)
  })

  it('should navigate to the workload owner caseload capacity screen', async () => {
    const link = await $('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
    await link.click()
    pageSubtitle = await $('.govuk-caption-xl')
    pageSubtitle = await pageSubtitle.getText()
    expect(pageSubtitle).to.equal('Offender Manager')

    const errorMessage = await $('.govuk-error-message')
    const errorText = await errorMessage.getText()
    expect(errorText).to.equal('There is no data for this period (// - //)')
  })

  after(function () {
    authenticationHelper.logout()
  })
})
