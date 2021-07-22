const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')

let offenderManagerId
let offenderManagerUrl
let pageTitle

describe('View adding a new reduction', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.Manager)
    return dataHelper.getAnyExistingWorkloadOwnerId()
      .then(function (results) {
        offenderManagerId = results
        offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId 
      })
  })

  describe('should navigate to the add reduction screen and submit a new reduction form', () => {
    it('with the correct breadcrumbs and heading title', async () => {
      await browser.url(offenderManagerUrl) // a shame , better to click through to an existing user
      const reductionURL = offenderManagerUrl + '/reductions'
      const link = await $('[href="' + reductionURL + '"]')
      await link.click()
      const addReductionURL = offenderManagerUrl + '/add-reduction'
      const addLink = await $('[href="' + addReductionURL + '"]')
      await addLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'New reduction Page title should be "New reduction"').to.equal('New reduction')
    })

    it('and submit a new reduction form', async () => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      const reductionTypeField = await $('#select-box')
      const hoursField = await $('#hours')
      const startDayField = await $('#start-day')
      const startMonthField = await $('#start-month')
      const startYearField = await $('#start-year')
      const endDayField = await $('#end-day')
      const endMonthField = await $('#end-month')
      const endYearField = await $('#end-year')
      let notesField = await $('#textarea')
      const submit = await $('#submit-button')

      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2018')
      await notesField.setValue(currentTime)

      await submit.click()
      const insertedReduction = await $("#archived-reduction-table td")
      const reduction = await dataHelper.getLastRecordFromTable('reductions')
      const reductionURL = '/probation/offender-manager/' + reduction.workload_owner_id + '/edit-reduction?reductionId=' + reduction.id
      const link = await $('[href="' + reductionURL + '"]')
      await link.click()
      notesField = await $('#textarea')
      notesField = await notesField.getValue()
      expect(reduction.notes, 'Last inserted reduction should have the following notes: ' + currentTime).to.be.equal(currentTime)
      expect(notesField, 'The notes field of the last inserted reduction should have the following contents: ' + currentTime).to.be.equal(currentTime)
    })
  })

  after(function () {
    authenticationHelp.logout()
    return dataHelper.deleteLastRecordFromTables(['reductions_history', 'reductions'])
  })
})
