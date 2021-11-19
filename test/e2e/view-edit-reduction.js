const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')

let offenderManagerId, reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit, offenderManagerUrl

describe('editing a reduction', () => {
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

    it('should navigate to the edit reduction screen with the archive and delete links', async () => {
      const breadcrumbs = await $('.govuk-breadcrumbs')
      const exists = await breadcrumbs.isExisting()
      expect(exists).to.be.equal(true)

      const pageTitle = await $('.govuk-heading-xl')
      let text = await pageTitle.getText()
      expect(text).to.equal('Reduction')

      const activeReduction = await $('=Archive reduction')
      text = await activeReduction.getText()
      expect(text).to.equal('Archive reduction')

      const deleteReduction = await $('=Delete reduction')
      text = await deleteReduction.getText()
      expect(text).to.equal('Delete reduction')
      const textArea = await $('#textarea')
      const notesField = await textArea.getValue()
      expect(notesField).to.be.equal(notesFieldValue)
    })

    it('should be able to edit a reduction', async () => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await endYearField.setValue('2027')
      await notesField.setValue(currentTime)

      await submit.click()

      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      const view = await viewLink.getText()
      expect(view).to.equal('View')
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

    it('should be not be able to edit a reduction', async () => {
      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      await viewLink.click()

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await endYearField.setValue('2027')
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

    it('should be able to edit a reduction', async () => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      endYearField = await $('#end-year')
      notesField = await $('#textarea')
      submit = await $('#submit-button')

      await endYearField.setValue('2027')
      await notesField.setValue(currentTime)

      await submit.click()

      const activeReductions = await browser.findElements('xpath', '//*[@id="active-reduction-table"]/tbody/tr[position()=1]/td[position()=5]/a')
      const viewLink = await $(activeReductions[0])
      const view = await viewLink.getText()
      expect(view).to.equal('View')
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
