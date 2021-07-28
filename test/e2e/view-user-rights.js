const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')

let adminUserURL
const username = 'John.Doe@email.com'

describe('View adding a new user role', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.SystemAdmin)
    adminUserURL = '/admin/user'
    await browser.url(adminUserURL)
  })

  describe('should navigate to the user rights page', () => {
    it('with the correct breadcrumbs, heading title and roles to select from', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      let submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      let radioButton = await $('#dataAdminRadio')
      await radioButton.click()
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#systemAdminRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#managerRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#staffRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const fullname = await $('#fullname')
      await fullname.setValue('John Doe')

      submit = await $('.govuk-button')
      await submit.click()
    })
  })

  after(function () {
    authenticationHelp.logout()
  })
})
