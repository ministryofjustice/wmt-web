const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')
const nationalDefaultUrl = '/' + workloadTypes.OMIC + '/hmpps/0'

describe('LDU Omic Overview', function () {
  describe('Staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      await navigateTo(nationalDefaultUrl)
    })

    it('should be able to go to Overview for LDU', async function () {
      await navigateTo(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await clickAndWaitForPageLoad(viewRegionLink)

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await clickAndWaitForPageLoad(viewLduLink)

      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await navigateTo(nationalDefaultUrl)
    })

    it('should be able to go to Overview for LDU', async function () {
      await navigateTo(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await clickAndWaitForPageLoad(viewRegionLink)

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await clickAndWaitForPageLoad(viewLduLink)

      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)
    })

    it('should be able to go to export page', async function () {
      const exportElement = await browser.findElements('xpath', '//*[@class="moj-sub-navigation__list"]/li[position()=2]/a')
      const exportTab = $(exportElement[0])
      const exists = await exportTab.isExisting()
      expect(exists).to.be.equal(true)
      await clickAndWaitForPageLoad(exportTab)

      const title = await $('.govuk-heading-m')
      await title.waitForDisplayed({ timeout: 30000 })
      const text = await title.getText()
      expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo(nationalDefaultUrl)
    })

    it('should be able to go to Overview for LDU', async function () {
      await navigateTo(nationalDefaultUrl + '/overview')

      const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewRegionLink = await $(activeRegion[0])
      await clickAndWaitForPageLoad(viewRegionLink)

      const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
      const viewLduLink = await $(activeLdu[0])
      await clickAndWaitForPageLoad(viewLduLink)

      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)
    })

    it('should not be able to go to export page', async function () {
      const exportElement = await browser.findElements('xpath', '//*[@class="moj-sub-navigation__list"]/li[position()=2]/a')
      return expect(exportElement.length).to.be.equal(0)
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      await navigateTo(nationalDefaultUrl)

      it('should be able to go to Overview for LDU', async function () {
        await navigateTo(nationalDefaultUrl + '/overview')

        const activeRegion = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
        const viewRegionLink = await $(activeRegion[0])
        await clickAndWaitForPageLoad(viewRegionLink)

        const activeLdu = await browser.findElements('xpath', '//*[@id="example"]/tbody/tr[position()=1]/td[position()=1]/a')
        const viewLduLink = await $(activeLdu[0])
        await clickAndWaitForPageLoad(viewLduLink)

        const pageTitle = await $('.govuk-heading-xl')
        await pageTitle.waitForDisplayed({ timeout: 30000 })
        const text = await pageTitle.getText()
        expect(text).to.equal(dailyArchiveData.lduName)
      })

      it('should be able to go to export page', async function () {
        const exportElement = await browser.findElements('xpath', '//*[@class="moj-sub-navigation__list"]/li[position()=2]/a')
        const exportTab = $(exportElement[0])
        const exists = await exportTab.isExisting()
        expect(exists).to.be.equal(true)
        await clickAndWaitForPageLoad(exportTab)

        const title = await $('.govuk-heading-m')
        await title.waitForDisplayed({ timeout: 30000 })
        const text = await title.getText()
        expect(text).to.equal('Select the data type to export (this will download as a .CSV file):')
      })

      after(async function () {
        await authenticationHelper.logout()
      })
    })
  })
})
