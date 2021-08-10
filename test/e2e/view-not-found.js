const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')

describe('View not found page', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.SystemAdmin)
  })

  describe('should navigate to the not found page', () => {
    it('with the correct heading title', async () => {
      await browser.url('/a-url-which-does-not-exist')

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Page not found')
    })
  })

  after(function () {
    authenticationHelp.logout()
  })
})
