const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')

describe('View not found page', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
  })

  it('should diplay when hitting a url which does not exist', async () => {
    await browser.url('/a-url-which-does-not-exist')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('Page not found')
  })

  it('should diplay when getting a region which does not exist', async () => {
    await browser.url('/probation/region/999')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('Page not found')
  })

  it('should diplay when getting a LDU which does not exist', async () => {
    await browser.url('/probation/ldu/999')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('Page not found')
  })

  it('should diplay when getting a team which does not exist', async () => {
    await browser.url('/probation/team/999')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('Page not found')
  })

  it('should diplay when getting a offender manager which does not exist', async () => {
    await browser.url('/probation/offender-manager/999')

    const pageTitle = await $('.govuk-heading-xl')
    const text = await pageTitle.getText('.govuk-heading-xl')
    expect(text).to.equal('Page not found')
  })

  after(function () {
    authenticationHelp.logout()
  })
})
