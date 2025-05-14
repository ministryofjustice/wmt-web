const expect = require('chai').expect
const moment = require('moment')

const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')
const { deleteAllMessages, pollCheckAndDelete } = require('../helpers/sqs')

const workloadTypes = require('../../app/constants/workload-type')
const getSqsClient = require('../../app/services/aws/sqs/get-sqs-client')
const { audit } = require('../../config')

const sqsClient = getSqsClient({ region: audit.region, accessKeyId: audit.accessKeyId, secretAccessKey: audit.secretAccessKey, endpoint: audit.endpoint })
const queueURL = audit.queueUrl

let offenderManagerId, reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit, offenderManagerUrl, auditData

describe('editing a reduction', () => {
  const notesFieldValue = 'some notes'

  before(async function () {
    offenderManagerId = await dataHelper.getAnyExistingWorkloadOwnerId()
    offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId
    auditData = await dataHelper.getOffenderManagerTeamRegionLduByWorkloadOwnerId(offenderManagerId)
    await deleteAllMessages(sqsClient, queueURL)
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await navigateTo(offenderManagerUrl + '/add-reduction')
    })

    it('after first adding a new reduction', async () => {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('New reduction')

      reductionTypeField = await $('#select-box')
      hoursField = await $('#hours')
      startDayField = await $('#start-day')
      startMonthField = await $('#start-month')
      startYearField = await $('#start-year')
      endDayField = await $('#end-day')
      endMonthField = await $('#end-month')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2028')
      await notesField.setValue(notesFieldValue)

      await clickAndWaitForPageLoad(submit)

      await pollCheckAndDelete(sqsClient, queueURL)

      await $('#headingActive')
      const viewLink = await $('=View')
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await clickAndWaitForPageLoad(viewLink)
    })

    it('should navigate to the edit reduction screen', async () => {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const textArea = await $('#textarea')
      const notesField = await textArea.getValue()
      expect(notesField).to.be.equal(notesFieldValue)
    })

    it('should not be able to view the Audit log', async () => {
      const auditTable = await $('#reduction-table')
      const exists = await auditTable.isExisting()
      expect(exists).to.be.equal(false)
    })

    it('should be able to edit a reduction', async () => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await endYearField.setValue('2029')
      await notesField.setValue(currentTime)

      await clickAndWaitForPageLoad(submit)

      const viewLink = await $('=View')
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await clickAndWaitForPageLoad(viewLink)

      notesField = await $('#textarea')
      notesField = await notesField.getValue()
      expect(notesField, 'The notes field of the last inserted reduction should have the following contents: ' + currentTime).to.be.equal(currentTime)

      const data = await pollCheckAndDelete(sqsClient, queueURL)
      const body = JSON.parse(data.Body)
      const currentDate = new Date().getTime()
      const whenDate = new Date(body.when).getTime()
      expect(body.what).to.equal('REDUCTION_EDITED')
      expect(body.who).to.equal(`${authenticationHelp.users.Manager.username.toLowerCase()}@digital.justice.gov.uk`)
      expect(body.service).to.equal('wmt')
      expect(whenDate).to.be.lessThan(currentDate)
      expect(body.operationId).to.not.equal(null)

      const actualDetails = JSON.parse(body.details)
      expect(actualDetails.previousReason).to.equal('Other')
      expect(actualDetails.newReason).to.equal('Other')
      expect(actualDetails.previousHours).to.equal(10)
      expect(actualDetails.newHours).to.equal(10)
      expect(actualDetails.previousAdditionalNotes).to.equal(notesFieldValue)
      expect(actualDetails.newAdditionalNotes).to.equal(currentTime)
      expect(actualDetails.previousEffectiveFrom).to.equal('2017-02-01T00:00:00.000Z')
      expect(actualDetails.newEffectiveFrom).to.equal('2017-02-01T00:00:00.000Z')
      expect(actualDetails.previousEffectiveTo).to.equal('2028-02-01T00:00:00.000Z')
      expect(actualDetails.newEffectiveTo).to.equal('2029-02-01T00:00:00.000Z')
      expect(actualDetails.previousStatus).to.equal('ACTIVE')
      expect(actualDetails.newStatus).to.equal('ACTIVE')
      expect(actualDetails.offenderManagerName).to.equal(`${auditData.forename} ${auditData.surname}`)
      expect(actualDetails.team).to.equal(`${auditData.teamCode} - ${auditData.teamDescription}`)
      expect(actualDetails.pdu).to.equal(`${auditData.lduCode} - ${auditData.lduDescription}`)
      expect(actualDetails.region).to.equal(`${auditData.regionCode} - ${auditData.regionDescription}`)
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await navigateTo(offenderManagerUrl + '/add-reduction')

      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      const text = await pageTitle.getText()
      expect(text).to.equal('New reduction')

      reductionTypeField = await $('#select-box')
      hoursField = await $('#hours')
      startDayField = await $('#start-day')
      startMonthField = await $('#start-month')
      startYearField = await $('#start-year')
      endDayField = await $('#end-day')
      endMonthField = await $('#end-month')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2028')
      await notesField.setValue(notesFieldValue)

      await clickAndWaitForPageLoad(submit)

      await authenticationHelp.logout()

      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await navigateTo(offenderManagerUrl + '/reductions')
    })

    it('should be not be able to edit a reduction', async () => {
      const viewLink = await $('=View')
      await clickAndWaitForPageLoad(viewLink)

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await endYearField.setValue('2029')
      await notesField.setValue(currentTime)

      await clickAndWaitForPageLoad(submit)

      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
      await navigateTo(offenderManagerUrl + '/add-reduction')
    })

    it('after first adding a new reduction', async () => {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      await breadcrumbs.waitForExist({ timeout: 30000 })
      expect(await breadcrumbs.isExisting()).to.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 60000 })
      expect(await pageTitle.getText()).to.equal('New reduction')

      const reductionTypeField = await $('#select-box')
      const hoursField = await $('#hours')
      const startDayField = await $('#start-day')
      const startMonthField = await $('#start-month')
      const startYearField = await $('#start-year')
      const endDayField = await $('#end-day')
      const endMonthField = await $('#end-month')
      const endYearField = await $('#end-year')
      const notesField = await $('#textarea')
      const submit = await $('#submit-button')

      await reductionTypeField.waitForDisplayed({ timeout: 10000 })
      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2028')

      const notesFieldValue = `Test Note - ${Date.now()}`
      await notesField.setValue(notesFieldValue)

      await clickAndWaitForPageLoad(submit)

      const heading = await $('#headingActive')
      await heading.waitForExist({ timeout: 30000 })

      const viewLink = await $('=View')
      await viewLink.waitForDisplayed({ timeout: 30000 })
      expect(await viewLink.getText()).to.equal('View')

      await clickAndWaitForPageLoad(viewLink)
    })

    it('should be able to edit a reduction', async () => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

      const endYearField = await $('#end-year')
      await endYearField.waitForExist({ timeout: 30000 })

      const notesField = await $('#textarea')
      await notesField.waitForExist({ timeout: 30000 })

      const submitButton = await $('#submit-button')
      await submitButton.waitForExist({ timeout: 30000 })

      await endYearField.setValue('2029')
      await notesField.setValue(currentTime)

      await clickAndWaitForPageLoad(submitButton)

      const viewLink = await $('=View')
      await viewLink.waitForDisplayed({ timeout: 10000 })

      const viewText = await viewLink.getText()
      expect(viewText).to.equal('View')

      await clickAndWaitForPageLoad(viewLink)

      const updatedNotesField = await $('#textarea')
      await updatedNotesField.waitForExist({ timeout: 30000 })

      const updatedNotesValue = await updatedNotesField.getValue()

      expect(
        updatedNotesValue,
        `Expected notes field to contain "${currentTime}", but got "${updatedNotesValue}"`
      ).to.equal(currentTime)
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })
  after(async function () {
    await deleteAllMessages(sqsClient, queueURL)
  })
})
