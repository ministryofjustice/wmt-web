const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

let workloadPointsURL
let pageTitle

describe('View admin role', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
    workloadPointsURL = '/admin/workload-points'
  })

  describe('should navigate to the admin page', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      const link = await $('[href="/admin"]')
      await link.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Admin Page title should be "Admin"').to.equal('Admin')
    })

    it('with the correct breadcrumbs and heading title', async () => {
      const link = await $('[href="/admin"]')
      await link.click()
      const pointsLink = await $('[href="' + workloadPointsURL + '"]')
      await pointsLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'Workload Points Page title should be "Workload Points"').to.equal('Workload Points')
    })
  })

  after(async function () {
    authenticationHelper.logout()
  })
})
