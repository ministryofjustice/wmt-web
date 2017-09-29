const expect = require('chai').expect

var adminUserURL

describe('View adding a new user role', () => {
  before(function () {
    adminUserURL = '/admin/user'
  })

  describe('should navigate to the user page', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(adminUserURL)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('User Rights')
        })
    })

    it('and submit a form withe a username', () => {
      browser.setValue('#username', 'John.Doe')
      browser.submitForm('#userForm')
    })

    it('and submit a form withe a username', () => {
      browser.setValue('#rights', 'Manager')
      browser.submitForm('#userRightForm')
    })
  })
})
