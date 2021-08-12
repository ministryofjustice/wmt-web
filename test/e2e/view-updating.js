const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const { addInProgressWorkloadReport, removeInsertedData } = require('../helpers/data/aggregated-data-helper')

describe('View updating page when ETL is running', () => {
  let inserts
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.SystemAdmin)
    inserts = await addInProgressWorkloadReport([])
  })

  it('should show the update in progress page', async () => {
    await browser.url('/')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('WMT Updating')
  })

  after(async function () {
    await authenticationHelp.logout()
    await removeInsertedData(inserts)
  })
})
