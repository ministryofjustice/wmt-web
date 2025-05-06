const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let adminUserURL
const username = 'John.Doe@email.com'
describe('User Rights page', () => {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/admin/user')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    it('Should not be able to go on page', async function () {
      await navigateTo('/admin/user')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Application Support', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      adminUserURL = '/admin/user'
      await navigateTo(adminUserURL)
    })

    it('should navigate to the user rights page and cannot see Super User role', async () => {
      await navigateTo(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Amend user rights')

      let radioButton = await $('#superAdminRadio')
      const SuperUserVisible = await radioButton.isExisting()
      expect(SuperUserVisible).to.be.equal(false)

      radioButton = await $('#applicationSupportRadio')
      await clickAndWaitForPageLoad(radioButton)
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#managerRadio')
      await clickAndWaitForPageLoad(radioButton)
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#staffRadio')
      await clickAndWaitForPageLoad(radioButton)
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)
    })

    it('should not be able to demote a Super User to Application Support', async () => {
      await navigateTo(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelper.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Amend user rights')

      const radioButton = await $('#managerRadio')
      await clickAndWaitForPageLoad(radioButton)
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await clickAndWaitForPageLoad(submitRole)

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })

    it('should not be able to demote a Super User to manager', async () => {
      await navigateTo(adminUserURL)
      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelper.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Amend user rights')

      const radioButton = await $('#applicationSupportRadio')
      await clickAndWaitForPageLoad(radioButton)
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await clickAndWaitForPageLoad(submitRole)

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })

    it('should not be able to demote a Super User to staff', async () => {
      await navigateTo(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelper.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Amend user rights')

      const radioButton = await $('#staffRadio')
      await clickAndWaitForPageLoad(radioButton)
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await clickAndWaitForPageLoad(submitRole)

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('Super User', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      adminUserURL = '/admin/user'
      await navigateTo(adminUserURL)
    })

    it('should see all roles', async () => {
      await navigateTo(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      const submit = await $('.govuk-button')
      await clickAndWaitForPageLoad(submit)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('Amend user rights')

      let radioButton = await $('#superAdminRadio')
      await clickAndWaitForPageLoad(radioButton)
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#applicationSupportRadio')
      await clickAndWaitForPageLoad(radioButton)
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#managerRadio')
      await clickAndWaitForPageLoad(radioButton)
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#staffRadio')
      await clickAndWaitForPageLoad(radioButton)
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
