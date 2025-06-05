const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerDefaultUrl
let teamDefaultUrl
let pageSubtitle
describe('Team', () => {
  describe('View your caseload capacity flow as staff', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()

      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(workloadOwnerDefaultUrl)
      const teamLink = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(teamLink)
      const teamCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(teamCapacityLink)
    })

    it('should navigate to the team caseload capacity screen', async () => {
      pageSubtitle = await $('.govuk-heading-xl')
      await pageSubtitle.waitForDisplayed({ timeout: 30000 })
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal(dailyArchiveData.teamName)

      const fromDayField = await $('#capacity-from-day')
      const fromMonthField = await $('#capacity-from-month')
      const fromYearField = await $('#capacity-from-year')
      const toDayField = await $('#capacity-to-day')
      const toMonthField = await $('#capacity-to-month')
      const toYearField = await $('#capacity-to-year')
      const submit = await $('#caseload-filter-submit')

      await fromDayField.setValue('2')
      await fromMonthField.setValue('3')
      await fromYearField.setValue('2017')
      await toDayField.setValue('2')
      await toMonthField.setValue('3')
      await toYearField.setValue('2018')

      await clickAndWaitForPageLoad(submit)

      const errorMessage = await $('.govuk-error-message')
      await errorMessage.waitForDisplayed({ timeout: 30000 })
      const errorText = await errorMessage.getText()
      expect(errorText).to.equal('There is no data for this period (// - //)')
      const errorSummary = await $('.govuk-error-summary')
      const exists = await errorSummary.isExisting()
      expect(exists).to.be.equal(false)
    })

    it('should display export button', async () => {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('View your caseload capacity flow as Manager', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()

      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(workloadOwnerDefaultUrl)
      const teamLink = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(teamLink)
      const teamCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(teamCapacityLink)
    })

    it('should display export button', async () => {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('View your caseload capacity flow as Application Support', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()

      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(workloadOwnerDefaultUrl)
      const teamLink = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(teamLink)
      const teamCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(teamCapacityLink)
    })

    it('should not display export button', async () => {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download outstanding', async function () {
      await navigateTo(teamDefaultUrl + '/capacity/outstanding-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('View your caseload capacity flow as Super User', () => {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
      const results = await workloadCapacityHelper.selectIdsForWorkloadOwner()

      workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + results.filter((item) => item.table === 'workload_owner')[0].id
      teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + results.filter((item) => item.table === 'team')[0].id
      await navigateTo(workloadOwnerDefaultUrl)
      const teamLink = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(teamLink)
      const teamCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(teamCapacityLink)
    })

    it('should display export button', async () => {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
