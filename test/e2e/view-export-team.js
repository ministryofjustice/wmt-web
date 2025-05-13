const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let teamDefaultUrl

describe('team', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(teamDefaultUrl + '/overview')
    })

    it('should not be able to view export', async function () {
      const exportLink = await $('[href="' + teamDefaultUrl + '/export"]')
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
      await navigateTo(teamDefaultUrl + '/export')
    })

    it('should navigate to the team export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at team level', async function () {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
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
      await navigateTo(teamDefaultUrl + '/export')
    })

    it('should navigate to the team export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should not include the export button at team level', async function () {
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
      await navigateTo(teamDefaultUrl + '/export')
    })

    it('should navigate to the team export page', async function () {
      const element = await $('.govuk-heading-m')
      await element.waitForDisplayed({ timeout: 30000 })
      const text = await element.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    it('should include the export button at team level', async function () {
      const exportButton = await $('.sln-export')
      await exportButton.waitForDisplayed({ timeout: 30000 })
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
