const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('Edit Workload Points T2A Page', () => {
  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const link = await $('[href="/admin"]')
      await link.click()
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await workloadPointsLink.click()
    })

    it('Should not be able to edit Workload Points T2a', async function () {
      const editButton = await $('#edit-button')
      await editButton.click()

      const pointField = await $('#cus-a3')
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.setValue('10')

      const saveButton = await $('#save-button')
      await saveButton.click()

      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const link = await $('[href="/admin"]')
      await link.click()
      const workloadPointsLink = await $('[href="/admin/workload-points/t2a"]')
      await workloadPointsLink.click()
    })

    it('Should be able to edit Workload Points T2a', async function () {
      const editButton = await $('#edit-button')
      await editButton.click()

      const pointField = await $('#cus-a3')
      await pointField.setValue('10')

      const pointFieldSuspended = await $('#cus-a3s')
      await pointFieldSuspended.setValue('10')

      const saveButton = await $('#save-button')
      await saveButton.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const text = await successBanner.getText()
      expect(text).to.equal('You have successfully updated the workload points for transition to adulthood cases!')
    })

    after(async function () {
      authenticationHelper.logout()
    })
  })
})
