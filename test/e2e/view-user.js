const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let adminUserURL

describe('View adding a new user role', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
    adminUserURL = '/admin/user'
    await navigateTo(adminUserURL)
  })

  describe('should navigate to the user page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await navigateTo(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')
    })

    it('and submit a form with a valid username', async () => {
      const username = await $('#username')
      await username.setValue('John.Doe')

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)
    })
  })

  after(async function () {
    await authenticationHelp.logout()
  })
})
