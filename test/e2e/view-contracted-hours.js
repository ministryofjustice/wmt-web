const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const { deleteAllMessages, pollCheckAndDelete } = require('../helpers/sqs')
const workloadTypes = require('../../app/constants/workload-type')
const getSqsClient = require('../../app/services/aws/sqs/get-sqs-client')
const { audit } = require('../../config')

const sqsClient = getSqsClient({ region: audit.region, accessKeyId: audit.accessKeyId, secretAccessKey: audit.secretAccessKey, endpoint: audit.endpoint })
const queueURL = audit.queueUrl

let workloadOwnerDefaultUrl
let auditData

describe('View contracted hours', function () {
  before(async function () {
    const results = await dataHelper.selectIdsForWorkloadOwner()
    const workloadOwnerId = results.filter((item) => item.table === 'workload_owner')[0].id
    auditData = await dataHelper.getOffenderManagerTeamRegionLduByWorkloadOwnerId(workloadOwnerId)
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
  })
  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.moj-sub-navigation__list')
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
      await contractedHoursField.setValue('36')
      await submit.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('You have successfully updated the contracted hours for Test_Forename Test_Surname')

      const data = await pollCheckAndDelete(sqsClient, queueURL)
      const body = JSON.parse(data.Body)
      const currentDate = new Date().getTime()
      const whenDate = new Date(body.when).getTime()
      expect(body.what).to.equal('CONTRACTED_HOURS_EDITED')
      expect(body.who).to.equal(`${authenticationHelp.users.Manager.username.toLowerCase()}@digital.justice.gov.uk`)
      expect(body.service).to.equal('wmt')
      expect(whenDate).to.be.lessThan(currentDate)
      expect(body.operationId).to.not.equal(null)

      const actualDetails = JSON.parse(body.details)
      expect(actualDetails.offenderManagerName).to.equal(`${auditData.forename} ${auditData.surname}`)
      expect(actualDetails.team).to.equal(`${auditData.teamCode} - ${auditData.teamDescription}`)
      expect(actualDetails.pdu).to.equal(`${auditData.lduCode} - ${auditData.lduDescription}`)
      expect(actualDetails.region).to.equal(`${auditData.regionCode} - ${auditData.regionDescription}`)
      expect(actualDetails.previousContractedHours).to.equal(parseInt(auditData.contractedHours))
      expect(actualDetails.newContractedHours).to.equal('36')
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })

  describe('Super User', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.moj-sub-navigation__list')
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
      await contractedHoursField.setValue('35')
      await submit.click()

      const successBanner = await $('.govuk-notification-banner--success .govuk-notification-banner__heading')
      const successBannerText = await successBanner.getText()
      expect(successBannerText).to.equal('You have successfully updated the contracted hours for Test_Forename Test_Surname')
    })

    after(async function () {
      await deleteAllMessages(sqsClient, queueURL)
      await authenticationHelp.logout()
    })
  })

  describe('Staff', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Staff)
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should not be able to navigate to the workload owner contracted-hours page', async function () {
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelp.logout()
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
    })

    it('should navigate to the workload owner contracted-hours page', async function () {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      let exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const subnav = await $('.moj-sub-navigation__list')
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

    after(async function () {
      await authenticationHelp.logout()
    })
  })
})
