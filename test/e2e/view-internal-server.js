const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')

describe('View internal server error page', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.SystemAdmin)
  })

  describe('should navigate to the internal server error page', () => {
    it('with the correct heading title', async () => {
      await browser.url('/probation/region/999')

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Sorry, there is a problem with the service')
    })
  })

  after(function () {
    authenticationHelp.logout()
  })
})
