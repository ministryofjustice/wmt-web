const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')

let offenderManagerId, reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit, offenderManagerUrl

describe('archiving a reduction', () => {
  const notesFieldValue = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

  before(async function () {
    offenderManagerId = await dataHelper.getAnyExistingWorkloadOwnerId()
    offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId
  })

  describe('Manager', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await browser.url(offenderManagerUrl + '/add-reduction')
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
      await endYearField.setValue('2025')
      await notesField.setValue(notesFieldValue)

      await submit.click()

      await $('#headingActive')
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await viewLink.click()
    })

    it('should navigate to the edit reduction screen and archive it', async () => {
      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const archiveReduction = await $('#archive-reduction')
      await archiveReduction.click()

      const successMessage = await $('#reduction-success-text')
      const successText = await successMessage.getText()
      expect(successText).to.be.equal('You have successfully archived the reduction!')
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })

  describe('Application Support', function () {
    before(async function () {
      await authenticationHelp.login(authenticationHelp.users.Manager)
      await browser.url(offenderManagerUrl + '/add-reduction')

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
      await endYearField.setValue('2025')
      await notesField.setValue(notesFieldValue)

      await submit.click()

      await authenticationHelp.logout()

      await authenticationHelp.login(authenticationHelp.users.ApplicationSupport)
      await browser.url(offenderManagerUrl + '/reductions')
    })

    it('should not be able to archive the reduction', async () => {
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      await viewLink.click()

      const pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const archiveReduction = await $('#archive-reduction')
      await archiveReduction.click()

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
      await authenticationHelp.login(authenticationHelp.users.SuperUser)
      await browser.url(offenderManagerUrl + '/add-reduction')
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
      await endYearField.setValue('2025')
      await notesField.setValue(notesFieldValue)

      await submit.click()

      await $('#headingActive')
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      const view = await viewLink.getText()
      expect(view).to.equal('View')
      await viewLink.click()
    })

    it('should navigate to the edit reduction screen and archive it', async () => {
      const pageTitle = await $('.govuk-heading-xl')
      const text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const archiveReduction = await $('#archive-reduction')
      await archiveReduction.click()

      const successMessage = await $('#reduction-success-text')
      const successText = await successMessage.getText()
      expect(successText).to.be.equal('You have successfully archived the reduction!')
    })

    after(async function () {
      await authenticationHelp.logout()
      return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
    })
  })
})