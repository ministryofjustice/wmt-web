const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadTypes = require('../../app/constants/workload-type')

const nationalDefaultUrl = '/' + workloadTypes.OMIC + '/hmpps/0'

describe('LDU Omic Overview', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await browser.url(nationalDefaultUrl)
    })

    it('should be able to go to Overview for LDU', async function () {
      await browser.url(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await viewRegionLink.click()

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await viewLduLink.click()

      const pageTitle = await $('.govuk-caption-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('OMIC')
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

    it('should be able to go to Overview for LDU', async function () {
      await browser.url(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await viewRegionLink.click()

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await viewLduLink.click()

      const pageTitle = await $('.govuk-caption-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('OMIC')
    })

    it('should be able to go to export page', async function () {
      const exportElement = await browser.findElements('xpath', '//*[@class="wmt-sub-nav"]/li[position()=2]/a')
      const exportTab = $(exportElement[0])
      const exists = await exportTab.isExisting()
      expect(exists).to.be.equal(true)
      await exportTab.click()

      const title = await $('.govuk-heading-m')
      const text = await title.getText()
      expect(text).to.equal('Please select the type of export to download:')
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

    it('should be able to go to Overview for LDU', async function () {
      await browser.url(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await viewRegionLink.click()

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await viewLduLink.click()

      const pageTitle = await $('.govuk-caption-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('OMIC')
    })

    it('should not be able to go to export page', async function () {
      const exportElement = await browser.findElements('xpath', '//*[@class="wmt-sub-nav"]/li[position()=2]/a')
      return expect(exportElement.length).to.be.equal(0)
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

    it('should be able to go to Overview for LDU', async function () {
      await browser.url(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await viewRegionLink.click()

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await viewLduLink.click()

      const pageTitle = await $('.govuk-caption-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('OMIC')
    })

    it('should be able to go to export page', async function () {
      const exportElement = await browser.findElements('xpath', '//*[@class="wmt-sub-nav"]/li[position()=2]/a')
      const exportTab = $(exportElement[0])
      const exists = await exportTab.isExisting()
      expect(exists).to.be.equal(true)
      await exportTab.click()

      const title = await $('.govuk-heading-m')
      const text = await title.getText()
      expect(text).to.equal('Please select the type of export to download:')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })
})
