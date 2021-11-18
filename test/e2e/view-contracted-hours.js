const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl

describe('View contracted hours', function () {
  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.wmt-sub-nav')
      exists = await subnav.isExisting()
      expect(exists).to.be.equal(true)

      const actionForm = await $('.sln-form-action')
      exists = await actionForm.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-l')
      const text = await pageTitle.getText()
      expect(text).to.equal('Contracted hours')
    })

    it('should be able to edit contracted hours', async function () {
      const contractedHoursField = await $('#contracted-hours')
      const submit = await $('.govuk-button')
      await contractedHoursField.setValue('5')
      await submit.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('You have successfully updated the contracted hours for Test_Forename Test_Surname')
    })

    after(function () {
      authenticationHelp.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.wmt-sub-nav')
      exists = await subnav.isExisting()
      expect(exists).to.be.equal(true)

      const actionForm = await $('.sln-form-action')
      exists = await actionForm.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-l')
      const text = await pageTitle.getText()
      expect(text).to.equal('Contracted hours')
    })

    it('should be able to edit contracted hours', async function () {
      const contractedHoursField = await $('#contracted-hours')
      const submit = await $('.govuk-button')
      await contractedHoursField.setValue('5')
      await submit.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('You have successfully updated the contracted hours for Test_Forename Test_Surname')
    })

    after(function () {
      authenticationHelp.logout()
    })
  })

  describe('Staff', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.wmt-sub-nav')
      exists = await subnav.isExisting()
      expect(exists).to.be.equal(true)

      const actionForm = await $('.sln-form-action')
      exists = await actionForm.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-l')
      const text = await pageTitle.getText()
      expect(text).to.equal('Contracted hours')
    })

    it('should not be able to edit contracted hours', async function () {
      const contractedHoursField = await $('#contracted-hours')
      const submit = await $('.govuk-button')
      await contractedHoursField.setValue('5')
      await submit.click()

      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(function () {
      authenticationHelp.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.wmt-sub-nav')
      exists = await subnav.isExisting()
      expect(exists).to.be.equal(true)

      const actionForm = await $('.sln-form-action')
      exists = await actionForm.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-l')
      const text = await pageTitle.getText()
      expect(text).to.equal('Contracted hours')
    })

    it('should not be able to edit contracted hours', async function () {
      const contractedHoursField = await $('#contracted-hours')
      const submit = await $('.govuk-button')
      await contractedHoursField.setValue('5')
      await submit.click()

      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(function () {
      authenticationHelp.logout()
    })
  })
})
