const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const { clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

describe('Edit Workload Points T2A Page', () => {
  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await clickAndWaitForPageLoad(workloadPointsLink)
    })

    it('Should not be able to edit Workload Points T2a', async function () {
      const editButton = await $('#edit-button')
      await clickAndWaitForPageLoad(editButton)

      const pointField = await $('#cus-a3')
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.setValue('10')

      const saveButton = await $('#save-button')
      await clickAndWaitForPageLoad(saveButton)

      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await clickAndWaitForPageLoad(link)
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await clickAndWaitForPageLoad(workloadPointsLink)
    })

    it('Should be able to edit Workload Points T2a', async function () {
      const editButton = await $('#edit-button')
      await clickAndWaitForPageLoad(editButton)

      const pointField = await $('#cus-a3')
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.setValue('10')

      const saveButton = await $('#save-button')
      await clickAndWaitForPageLoad(saveButton)

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      await successBanner.waitForDisplayed({ timeout: 30000 })
      const text = await successBanner.getText()
      expect(text).to.equal('You have successfully updated the workload points for transition to adulthood cases!')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
