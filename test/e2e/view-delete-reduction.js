const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

const { deleteAllMessages, pollCheckAndDelete } = require('../helpers/sqs')

const getSqsClient = require('../../app/services/aws/sqs/get-sqs-client')
const { audit } = require('../../config')

const sqsClient = getSqsClient({ region: audit.region, accessKeyId: audit.accessKeyId, secretAccessKey: audit.secretAccessKey, endpoint: audit.endpoint })
const queueURL = audit.queueUrl

let offenderManagerId, reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit, offenderManagerUrl, auditData

describe('deleting a reduction', () => {
  const notesFieldValue = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

  before(async function () {
    offenderManagerId = await dataHelper.getAnyExistingWorkloadOwnerId()
    auditData = await dataHelper.getOffenderManagerTeamRegionLduByWorkloadOwnerId(offenderManagerId)
    offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId
  })

  describe('Manager', function () {
    before(async function () {
      await browser.reloadSession()
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

      await $('#headingActive')
      const viewLink = await $('=View')
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await clickAndWaitForPageLoad(viewLink)
      await deleteAllMessages(sqsClient, queueURL)
    })

    it('should navigate to the edit reduction screen and delete it', async () => {
      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const deleteReduction = await $('#delete-reduction')
      await clickAndWaitForPageLoad(deleteReduction)

      const successMessage = await $('#reduction-success-text')
      const successText = await successMessage.getText()
      expect(successText).to.be.equal('You have successfully deleted the reduction!')

      const data = await pollCheckAndDelete(sqsClient, queueURL)
      const body = JSON.parse(data.Body)
      const currentDate = new Date().getTime()
      const whenDate = new Date(body.when).getTime()
      expect(body.what).to.equal('REDUCTION_DELETED')
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
      expect(actualDetails.newAdditionalNotes).to.equal(notesFieldValue)
      expect(actualDetails.previousEffectiveFrom).to.equal('2017-02-01T00:00:00.000Z')
      expect(actualDetails.newEffectiveFrom).to.equal('2017-02-01T00:00:00.000Z')
      expect(actualDetails.previousEffectiveTo).to.equal('2028-02-01T00:00:00.000Z')
      expect(actualDetails.newEffectiveTo).to.equal('2028-02-01T00:00:00.000Z')
      expect(actualDetails.previousStatus).to.equal('ACTIVE')
      expect(actualDetails.newStatus).to.equal('DELETED')
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
      await browser.reloadSession()
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await navigateTo(offenderManagerUrl + '/add-reduction')

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

      await authenticationHelp.logout()

      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await navigateTo(offenderManagerUrl + '/reductions')
    })

    it('should not be able to delete the reduction', async () => {
      const viewLink = await $('=View')
      await clickAndWaitForPageLoad(viewLink)

      const pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const deleteReduction = await $('#delete-reduction')
      await clickAndWaitForPageLoad(deleteReduction)

      const header = await $('.govuk-heading-xl')
      text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })

  describe('Super User', function () {
    before(async function () {
      await browser.reloadSession()
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
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

      await $('#headingActive')
      const viewLink = await $('=View')
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await clickAndWaitForPageLoad(viewLink)
    })

    it('should navigate to the edit reduction screen and delete it', async () => {
      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const deleteReduction = await $('#delete-reduction')
      await clickAndWaitForPageLoad(deleteReduction)

      const successMessage = await $('#reduction-success-text')
      const successText = await successMessage.getText()
      expect(successText).to.be.equal('You have successfully deleted the reduction!')
    })

    after(async function () {
      await authenticationHelp.logout()
      await deleteAllMessages(sqsClient, queueURL)
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })
})
