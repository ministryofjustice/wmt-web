const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let regionDefaultUrl

describe('region', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + results.filter((item) => item.table === 'region')[0].id
      await navigateTo(regionDefaultUrl + '/overview')
    })

    it('should not be able to view export', async function () {
      const exportLink = await $('[href="' + regionDefaultUrl + '/export"]')
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
      await navigateTo(regionDefaultUrl + '/export')
    })

    it('should navigate to the region export page', async function () {
      const element = await $('.govuk-heading-m')
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at region level', async function () {
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
      await navigateTo(regionDefaultUrl + '/export')
    })

    it('should navigate to the region export page', async function () {
      const element = await $('.govuk-heading-m')
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should not include the export button at region level', async function () {
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
      await navigateTo(regionDefaultUrl + '/export')
    })

    it('should navigate to the region export page', async function () {
      const element = await $('.govuk-heading-m')
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at region level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
