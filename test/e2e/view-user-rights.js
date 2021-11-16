const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')

let adminUserURL
const username = 'John.Doe@email.com'

describe('Application Support', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
    adminUserURL = '/admin/user'
    await browser.url(adminUserURL)
  })

  describe('should navigate to the user rights page', () => {
    it('and cannot see Super User role', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      const submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      let radioButton = await $('#superAdminRadio')
      const SuperUserVisible = await radioButton.isExisting()
      expect(SuperUserVisible).to.be.equal(false)

      radioButton = await $('#applicationSupportRadio')
      await radioButton.click()
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#managerRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#staffRadio')
      await radioButton.click()
      isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)
    })
  })

  describe('should navigate to the user rights page', () => {
    it('and cannot demote a Super User to Application Support', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelp.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      const radioButton = await $('#managerRadio')
      await radioButton.click()
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await submitRole.click()

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })
  })

  describe('should navigate to the user rights page', () => {
    it('and cannot demote a Super User to manager', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelp.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      const radioButton = await $('#applicationSupportRadio')
      await radioButton.click()
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await submitRole.click()

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })
  })

  describe('should navigate to the user rights page', () => {
    it('and cannot demote a Super User to staff', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(`${authenticationHelp.users.SuperUser.username}@email.com`)

      const submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      const radioButton = await $('#staffRadio')
      await radioButton.click()
      const isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      const submitRole = await $('.govuk-button')
      await submitRole.click()

      const header = await $('.govuk-heading-xl')
      const headerText = await header.getText('.govuk-heading-xl')
      expect(headerText).to.equal('Access is denied')
    })
  })

  after(function () {
    authenticationHelp.logout()
  })
})

describe('Super User', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.SuperUser)
    adminUserURL = '/admin/user'
    await browser.url(adminUserURL)
  })

  describe('should navigate to the user rights page', () => {
    it('and can see all roles', async () => {
      await browser.url(adminUserURL)

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const usernameField = await $('#username')
      await usernameField.setValue(username)

      const submit = await $('.govuk-button')
      await submit.click()

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText('.govuk-heading-xl')
      expect(text).to.equal('User rights')

      let radioButton = await $('#superAdminRadio')
      await radioButton.click()
      let isSelected = await radioButton.isSelected()
      expect(isSelected).to.be.equal(true)

      radioButton = await $('#applicationSupportRadio')
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
    })
  })

  after(function () {
    authenticationHelp.logout()
  })
})
