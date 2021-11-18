const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const moment = require('moment')

let offenderManagerId, reductionTypeField, hoursField, startDayField, startMonthField, startYearField, endDayField, endMonthField, endYearField, notesField, submit

describe('View editing a new reduction', () => {
  const notesFieldValue = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.Manager)
    offenderManagerId = await dataHelper.getAnyExistingWorkloadOwnerId()
    const offenderManagerUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + offenderManagerId + '/add-reduction'
    await browser.url(offenderManagerUrl)
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

  describe('should navigate to the edit reduction screen and be editable', () => {
    it('with the correct breadcrumbs and heading title', async () => {
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
  })

  describe('Clicking on Archive reduction link', function () {
    it('should post the reduction for a ARCHIVE status', async function () {
      const activeReduction = await $('=Archive reduction')
      const text = await activeReduction.getAttribute('href')
      expect(text).to.equal('javascript:document.archiveReduction.submit()')
    })

    it('should post the reduction for a DELETE status', async function () {
      const deleteReduction = await $('=Delete reduction')
      const text = await deleteReduction.getAttribute('href')
      expect(text).to.equal('javascript:document.deleteReduction.submit()')
    })
  })

  after(async function () {
    await authenticationHelp.logout()
    return dataHelper.deleteReductionsForWorkloadOwner(offenderManagerId)
  })
})
