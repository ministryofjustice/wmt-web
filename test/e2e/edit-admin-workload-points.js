const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

async function navigateToWorkloadPointsPage () {
  const adminLink = await $('[href="/admin"]')
  await adminLink.waitForClickable({ timeout: 60000 })
  await clickAndWaitForPageLoad(adminLink)

  const workloadPointsLink = await $('[href="/admin/workload-points"]')
  await workloadPointsLink.waitForClickable({ timeout: 60000 })
  await clickAndWaitForPageLoad(workloadPointsLink)
}

describe('Edit Workload Points Page', () => {
  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateToWorkloadPointsPage()
    })

    it('should not be able to edit Workload Points', async function () {
      const editButton = await $('#edit-button')
      await editButton.waitForClickable({ timeout: 60000 })
      await clickAndWaitForPageLoad(editButton)

      const pointField = await $('#cus-a3')
      await pointField.waitForDisplayed({ timeout: 60000 })
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.waitForDisplayed({ timeout: 60000 })
      await pointFieldSuspended.setValue('10')

      const saveButton = await $('#save-button')
      await saveButton.waitForClickable({ timeout: 60000 })
      await clickAndWaitForPageLoad(saveButton)

      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 60000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied', 'Expected denial message was not shown')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await navigateToWorkloadPointsPage()
    })

    it('should be able to edit Workload Points', async function () {
      const editButton = await $('#edit-button')
      await editButton.waitForClickable({ timeout: 5000 })
      await clickAndWaitForPageLoad(editButton)

      const pointField = await $('#cus-a3')
      await pointField.waitForDisplayed({ timeout: 5000 })
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.waitForDisplayed({ timeout: 5000 })
      await pointFieldSuspended.setValue('10')

      const defaultContractedHoursLink = await $('=Other')
      await clickAndWaitForPageLoad(defaultContractedHoursLink)

      const contractedHoursField = await $('#defaultContractedHoursPso')
      await contractedHoursField.waitForDisplayed({ timeout: 10000 })
      await contractedHoursField.clearValue()
      await contractedHoursField.setValue('20')
      expect(await contractedHoursField.getValue()).to.equal('20')

      const saveButton = await $('#save-button')
      await saveButton.waitForClickable({ timeout: 5000 })
      await clickAndWaitForPageLoad(saveButton)

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      await successBanner.waitForDisplayed({ timeout: 5000 })
      const text = await successBanner.getText()
      expect(text).to.equal('You have successfully updated the workload points!', 'Success banner text did not match')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
