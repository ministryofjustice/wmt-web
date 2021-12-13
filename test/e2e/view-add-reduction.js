const expect = require('chai').expect
const moment = require('moment')

const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const getSqsClient = require('../../app/services/aws/sqs/get-sqs-client')
const { audit } = require('../../config')

const receiveSqsMessage = require('../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../app/services/aws/sqs/delete-sqs-message')
const sqsClient = getSqsClient({ region: audit.region, accessKeyId: audit.accessKeyId, secretAccessKey: audit.secretAccessKey, endpoint: audit.endpoint })
const queueURL = audit.queueUrl

let offenderManagerId
let offenderManagerUrl
let pageTitle
let auditData

describe('View adding a new reduction', () => {
  before(async function () {
    return dataHelper.getAnyExistingWorkloadOwnerId()
      .then(function (results) {
        offenderManagerId = results
        offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId
        return dataHelper.getOffenderManagerTeamRegionLduByWorkloadOwnerId(offenderManagerId).then(function (res) {
          auditData = res
        })
      })
  })
  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await browser.url(offenderManagerUrl + '/reductions')
    })

    it('should navigate to the add reduction screen and submit a new reduction form', async () => {
      const addLink = await $('[href="' + offenderManagerUrl + '/add-reduction' + '"]')
      await addLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'New reduction Page title should be "New reduction"').to.equal('New reduction')

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
      await endYearField.setValue('2028')
      await notesField.setValue(currentTime)

      await submit.click()
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      await viewLink.click()
      notesField = await $('#textarea')
      notesField = await notesField.getValue()
      expect(notesField, 'The notes field of the last inserted reduction should have the following contents: ' + currentTime).to.be.equal(currentTime)
      return pollAndCheck().then(function (data) {
        const body = JSON.parse(data.Body)
        const currentDate = new Date().getTime()
        const whenDate = new Date(body.when).getTime()
        expect(body.what).to.equal('REDUCTION_STARTED')
        expect(body.who).to.equal('WMT_MANAGER@digital.justice.gov.uk')
        expect(body.service).to.equal('wmt')
        expect(whenDate).to.be.lessThan(currentDate)
        expect(body.operationId).to.not.equal(null)

        const actualDetails = JSON.parse(body.details)
        expect(actualDetails.previousReason).to.equal('Other')
        expect(actualDetails.newReason).to.equal('Other')
        expect(actualDetails.previousHours).to.equal(10)
        expect(actualDetails.newHours).to.equal(10)
        expect(actualDetails.previousAdditionalNotes).to.equal(currentTime)
        expect(actualDetails.newAdditionalNotes).to.equal(currentTime)
        expect(actualDetails.previousEffectiveFrom).to.equal('2017-02-01')
        expect(actualDetails.newEffectiveFrom).to.equal('2017-02-01')
        expect(actualDetails.previousEffectiveTo).to.equal('2028-02-01')
        expect(actualDetails.newEffectiveTo).to.equal('2028-02-01')
        expect(actualDetails.previousStatus).to.equal('ACTIVE')
        expect(actualDetails.newStatus).to.equal('ACTIVE')
        expect(actualDetails.offenderManagerName).to.equal(`${auditData.forename} ${auditData.surname}`)
        expect(actualDetails.team).to.equal(`${auditData.teamCode} - ${auditData.teamDescription}`)
        expect(actualDetails.pdu).to.equal(`${auditData.lduCode} - ${auditData.lduDescription}`)
        expect(actualDetails.region).to.equal(`${auditData.regionCode} - ${auditData.regionDescription}`)
      })
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await browser.url(offenderManagerUrl + '/reductions')
    })

    it('should navigate to the add reduction screen and not be able to submit a new reduction form', async () => {
      const addLink = await $('[href="' + offenderManagerUrl + '/add-reduction' + '"]')
      await addLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'New reduction Page title should be "New reduction"').to.equal('New reduction')

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
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

      await reductionTypeField.selectByVisibleText('Other')
      await hoursField.setValue('10')
      await startDayField.setValue('1')
      await startMonthField.setValue('2')
      await startYearField.setValue('2017')
      await endDayField.setValue('1')
      await endMonthField.setValue('2')
      await endYearField.setValue('2028')
      await notesField.setValue(currentTime)

      await submit.click()
      const header = await $('.govuk-heading-xl')
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
      await browser.url(offenderManagerUrl + '/reductions')
    })

    it('should navigate to the add reduction screen and submit a new reduction form', async () => {
      const addLink = await $('[href="' + offenderManagerUrl + '/add-reduction' + '"]')
      await addLink.click()
      pageTitle = await $('.govuk-heading-xl')
      pageTitle = await pageTitle.getText()
      expect(pageTitle, 'New reduction Page title should be "New reduction"').to.equal('New reduction')

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
      await endYearField.setValue('2028')
      await notesField.setValue(currentTime)

      await submit.click()
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      await viewLink.click()
      notesField = await $('#textarea')
      notesField = await notesField.getValue()
      expect(notesField, 'The notes field of the last inserted reduction should have the following contents: ' + currentTime).to.be.equal(currentTime)
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })
})

function pollAndCheck () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        return data.Messages[0]
      })
    }
    return pollAndCheck()
  })
}
