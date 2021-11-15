const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('view dashboard reports', function () {
  async function extractFileUrl (row) {
    const fileUrlElement = await row.$('td[headers="link"] a')
    return fileUrlElement.getAttribute('href')
  }

  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.SuperUser)
    const link = await $('[href="/probation/hmpps/0/dashboard"]')
    await link.click()
  })

  it('shows five dashboard links in date order', async function () {
    const rows = await browser.findElements('xpath', '//*[@id="dashboard-table"]/tbody/tr')

    expect(rows.length).to.equal(5)

    const firstFileUrl = await extractFileUrl(await $(rows[0]))
    expect(firstFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210802062147.txt')

    const lastFileUrl = await extractFileUrl(await $(rows[4]))
    expect(lastFileUrl).to.equal('/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210729062147.txt')
  })

  after(async function () {
    await authenticationHelper.logout()
  })
})
