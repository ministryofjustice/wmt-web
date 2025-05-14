const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let lduDefaultUrl

describe('LDU', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + results.filter((item) => item.table === 'ldu')[0].id
      await browser.url(lduDefaultUrl + '/overview')
      await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === 'complete',
        {
          timeout: 80000,
          timeoutMsg: 'Page did not load within 80 seconds'
        }
      )
    })

    it('should not be able to view export', async function () {
      const exportLink = await $('[href="' + lduDefaultUrl + '/export"]')
      const exists = await exportLink.isExisting()
      return expect(exists).to.be.false
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('Managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await navigateTo(lduDefaultUrl + '/export')
    })

    it('should navigate to the ldu export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at ldu level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('export for Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo(lduDefaultUrl + '/export')
      const heading = await $('.govuk-heading-m')
      heading.waitForDisplayed()
    })

    it('should navigate to the ldu export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should not include the export button at ldu level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('export for Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await browser.url(lduDefaultUrl + '/export')
      await navigateTo(lduDefaultUrl + '/export')
    })

    it('should navigate to the ldu export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at ldu level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
