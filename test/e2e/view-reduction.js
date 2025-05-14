const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let offenderManagerId
let offenderManagerUrl

describe('View a reduction', () => {
  before(async function () {
    const results = await dataHelper.getAnyExistingWorkloadOwnerId()
    offenderManagerId = results
    offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId + '/reductions'
  })

  describe('Staff', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Staff)
      await navigateTo(offenderManagerUrl)
    })

    it('Should not be able to navigate to page', async () => {
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 60000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })
  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await navigateTo(offenderManagerUrl)
    })

    describe('should navigate to the reduction', () => {
      it('with the correct breadcrumbs and heading title', async () => {
        const breadcrumbs = await $('.govuk-breadcrumbs')
        let exists = await breadcrumbs.isExisting()
        expect(exists).to.be.equal(true)

        const subnav = await $('.moj-sub-navigation__list')
        exists = await subnav.isExisting()
        expect(exists).to.be.equal(true)

        const pageTitle = await $('.govuk-heading-xl')
        await pageTitle.waitForDisplayed({ timeout: 60000 })
        const text = await pageTitle.getText()
        expect(text).to.equal(dailyArchiveData.omNameDisplayed)
      })

      it('with an active table', async () => {
        await navigateTo(offenderManagerUrl)

        let element = await $('#headingActive')
        await element.waitForDisplayed({ timeout: 60000 })
        let text = await element.getText()
        expect(text).to.contain('Active')

        element = await $('#active_type')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Type')

        element = await $('#active_hours')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Hours')

        element = await $('#active_start_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Start date')

        element = await $('#active_end_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('End date')
      })

      it('with a scheduled table', async () => {
        await navigateTo(offenderManagerUrl)
        let element = await $('#headingScheduled')
        await element.waitForDisplayed({ timeout: 60000 })
        let text = await element.getText()
        expect(text).to.contain('Scheduled')

        element = await $('#scheduled_type')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Type')

        element = await $('#scheduled_hours')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Hours')

        element = await $('#scheduled_start_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Start date')

        element = await $('#scheduled_end_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('End date')
      })

      it('with an archived table', async () => {
        await navigateTo(offenderManagerUrl)
        let element = await $('#headingArchived')
        await element.waitForDisplayed({ timeout: 60000 })
        let text = await element.getText()
        expect(text).to.contain('Archived')

        element = await $('#archived_type')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Type')

        element = await $('#archived_hours')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Hours')

        element = await $('#archived_start_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('Start date')

        element = await $('#archived_end_date')
        await element.waitForDisplayed({ timeout: 60000 })
        text = await element.getText()
        expect(text).to.equal('End date')
      })
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })
  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await navigateTo(offenderManagerUrl)
    })

    it('should be able to navigate to page', async () => {
      const activeReductionHeading = await $('#headingActive')
      const exists = await activeReductionHeading.isExisting()
      expect(exists).to.be.equal(true)
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })
  describe('Super User', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      const results = await dataHelper.getAnyExistingWorkloadOwnerId()
      offenderManagerId = results
      offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId + '/reductions'
      await navigateTo(offenderManagerUrl)
    })

    it('should be able to navigate to page', async () => {
      const activeReductionHeading = await $('#headingActive')
      const exists = await activeReductionHeading.isExisting()
      expect(exists).to.be.equal(true)
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })
})
