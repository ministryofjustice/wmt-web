const expect = require('chai').expect

describe('View auth error', () => {
  describe('should navigate to the auth error page', () => {
    it('without the sign out button', async () => {
      await browser.url('/authError')
      const signOutLink = await $('[href="/logout"]')
      const signOutExists = await signOutLink.isExisting()
      return expect(signOutExists).to.be.false
    })
  })
})
