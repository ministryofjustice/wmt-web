const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('view dashboard reports', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    const link = await $('[href="/probation/hmpps/0/dashboard"]')
    await link.click()
  })

  it('shows five dashboard links in date order', async function () {
    const rows = await browser.findElements('xpath', '//*[@id="override-govuk-table"]/tbody/tr')

    expect(rows.length).to.equal(5)
  })

  after(async function () {
    await authenticationHelper.logout()
  })
})
