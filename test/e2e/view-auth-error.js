const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('View auth error', () => {
  describe('should navigate to the auth error page', () => {
    it('when logged in should show sign out button', async () => {
      await authenticationHelper.login(authenticationHelper.users.unautheticatedUser)
      const signOutLink = await $('[href="/sign-out"]')
      const signOutExists = await signOutLink.isExisting()
      await authenticationHelper.logout()
      return expect(signOutExists).to.be.true
    })
  })
})
