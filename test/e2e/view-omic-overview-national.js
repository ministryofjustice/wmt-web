const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')

const nationalDefaultUrl = '/' + workloadTypes.OMIC + '/hmpps/0'

describe('National Omic Overview', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await browser.url(nationalDefaultUrl)
    })

    it('should show regional breakdown table', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Region')
    })

    it('should allow the user to navigate down the org hierarchy from the national page', async function () {
      await browser.url(nationalDefaultUrl + '/overview')
      let pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal('National')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await viewRegionLink.click()

      pageTitle = await $('.govuk-heading-xl')
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.regionName)

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])

      await viewLduLink.click()

      pageTitle = await $('.govuk-heading-xl')
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)
    })

    it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', async function () {
      const breadcrumbRegion = await browser.findElements('xpath', '//*[@class="govuk-breadcrumbs__list"]/li[position()=2]/a')
      const breadcrumbRegionLink = await $(breadcrumbRegion[0])

      await breadcrumbRegionLink.click()

      let pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.regionName)

      const breadcrumbNational = await browser.findElements('xpath', '//*[@class="govuk-breadcrumbs__list"]/li[position()=1]/a')
      const breadcrumbNationalLink = await $(breadcrumbNational[0])

      await breadcrumbNationalLink.click()

      pageTitle = await $('.govuk-heading-xl')
      text = await pageTitle.getText()
      expect(text).to.equal('National')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('Managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await browser.url(nationalDefaultUrl)
    })

    it('should show regional breakdown table', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Region')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await browser.url(nationalDefaultUrl)
    })

    it('should show regional breakdown table', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Region')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await browser.url(nationalDefaultUrl)
    })

    it('should show regional breakdown table', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Region')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
