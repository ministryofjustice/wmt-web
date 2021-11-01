const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

describe('View expiring reductions', () => {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.DataAdmin)
  })
  describe('should navigate to the other managers expiring reductions and search for a single manager', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      const link = await $('[href="/expiring-reductions"]')
      await link.click()
      const otherManagerLink = await $('[href="/expiring-reductions-other"]')
      await otherManagerLink.click()

      let pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      let pageSubtitle = await $('.govuk-caption-xl')
      pageSubtitle = await pageSubtitle.getText()

      expect(pageTitle).to.equal('Other Managers\' Expiring Reductions')
      expect(pageSubtitle).to.equal('Other Managers\' Expiring Reductions')

      const extraSearchCritera = await $('.select2-search__field')

      await extraSearchCritera.setValue('w')

      const criteriaName = await $('#select2-search-field-results li')
      await criteriaName.click()

      const searchButton = await $('#expiring-reductions-submit')

      await searchButton.click()

      const table = await $('#expiring-reduction-other-table')

      const tableExists = await table.isExisting()
      return expect(tableExists).to.be.true
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
