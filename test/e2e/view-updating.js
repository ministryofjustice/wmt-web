const expect = require('chai').expect
const moment = require('moment')

const authenticationHelp = require('../helpers/routes/authentication-helper')
const { addInProgressWorkloadReport, removeInsertedData } = require('../helpers/data/aggregated-data-helper')

describe('View updating page when ETL is running', () => {
  let inserts
  before(async function () {
    inserts = await addInProgressWorkloadReport([])
    await authenticationHelp.login(authenticationHelp.users.SystemAdmin)
  })

  it('should show the update in progress page', async () => {
    await browser.url('/')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('WMT Updating')
    const updateTime = await $('#eta')
    const effectiveFrom = inserts[0].effective_from
    const updateTimeText = await updateTime.getText()
    const ETAMinutes = moment(effectiveFrom).format('mm')
    const minutesToAdd = 15 - (parseInt(ETAMinutes) % 15)
    const ETA = moment(effectiveFrom).add(90, 'minutes').add(minutesToAdd, 'minutes').format('h:mm a')
    expect(updateTimeText).to.equal(ETA)
  })

  after(async function () {
    await authenticationHelp.logout()
    await removeInsertedData(inserts)
  })
})
