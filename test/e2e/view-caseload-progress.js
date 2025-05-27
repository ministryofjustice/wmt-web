const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const caseProgressDataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerIds = []
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl

describe('View caseload progress flow', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.Staff)
    const results = await caseProgressDataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
    await navigateTo(workloadOwnerDefaultUrl + '/caseload-capacity')
  })

  it('should navigate to the workload owner caseload progress screen', async () => {
    await navigateTo(workloadOwnerDefaultUrl + '/caseload-capacity')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    // Check the href for case progress using the id exists
    const link = await $('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
    await clickAndWaitForPageLoad(link)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    await pageTitle.waitForDisplayed({ timeout: 30000 })
    const text = await pageTitle.getText()
    expect(text).to.equal(dailyArchiveData.omNameDisplayed)
  })

  it('should navigate to the team caseload progress screen', async () => {
    await navigateTo(teamDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    await pageTitle.waitForDisplayed({ timeout: 30000 })
    const text = await pageTitle.getText()
    expect(text).to.equal(dailyArchiveData.teamName)
  })

  it('should navigate to the ldu caseload progress screen', async () => {
    await navigateTo(lduDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + lduDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + lduDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    await pageTitle.waitForDisplayed({ timeout: 30000 })
    const text = await pageTitle.getText()
    expect(text).to.equal(dailyArchiveData.lduName)
  })

  it('should navigate to the region caseload progress screen', async () => {
    await navigateTo(regionDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + regionDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + regionDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    await pageTitle.waitForDisplayed({ timeout: 30000 })
    const text = await pageTitle.getText()
    expect(text).to.equal(dailyArchiveData.regionName)
  })

  it('should navigate to the national caseload progress screen', async () => {
    await navigateTo(nationalDefaultUrl + '/case-progress')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const caseloadCapacityLink = await $('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
    exists = await caseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)

    const caseProgressLink = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
    exists = await caseProgressLink.isExisting()
    expect(exists).to.be.equal(true)

    const plotlyPlot = await $('.js-plotly-plot')
    exists = await plotlyPlot.isExisting()
    expect(exists).to.be.equal(true)

    const pageTitle = await $('.govuk-heading-xl')
    await pageTitle.waitForDisplayed({ timeout: 30000 })
    const text = await pageTitle.getText()
    expect(text).to.equal('National')
  })

  it('should be accessible via the Case Progress tab on each org levels default view', async () => {
    await navigateTo(nationalDefaultUrl)

    const nationalCaseProgressLink = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
    let exists = await nationalCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(nationalCaseProgressLink)
    let plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const nationalOverviewLink = await $('[href="' + nationalDefaultUrl + '/overview"]')
    exists = await nationalOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(nationalOverviewLink)

    const regionLink = await $('[href="' + regionDefaultUrl + '"]')
    exists = await regionLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(regionLink)

    const regionCaseProgressLink = await $('[href="' + regionDefaultUrl + '/case-progress"]')
    exists = await regionCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(regionCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const regionOverviewLink = await $('[href="' + regionDefaultUrl + '/overview"]')
    exists = await regionOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(regionOverviewLink)

    const lduLink = await $('[href="' + lduDefaultUrl + '"]')
    exists = await lduLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(lduLink)

    const lduLCaseProgressLink = await $('[href="' + lduDefaultUrl + '/case-progress"]')
    exists = await lduLCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(lduLCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const lduOverviewLink = await $('[href="' + lduDefaultUrl + '/overview"]')
    exists = await lduOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(lduOverviewLink)

    const teamLink = await $('[href="' + teamDefaultUrl + '"]')
    exists = await teamLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamLink)

    const teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamOverviewLink = await $('[href="' + teamDefaultUrl + '/overview"]')
    exists = await teamOverviewLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamOverviewLink)

    const workloadOwnerLink = await $('[href="' + workloadOwnerDefaultUrl + '"]')
    exists = await workloadOwnerLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(workloadOwnerLink)

    const workloadOwnerCaseProgressLink = await $('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
    exists = await workloadOwnerCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(workloadOwnerCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)
  })

  it('should be accessible via the Case Progress tab when on any other tab', async () => {
    await browser.url(teamDefaultUrl)
    let teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    let exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseProgressLink)
    let plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamCaseloadLink = await $('[href="' + teamDefaultUrl + '/caseload"]')
    exists = await teamCaseloadLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseloadLink)

    teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)

    const teamCaseloadCapacityLink = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
    exists = await teamCaseloadCapacityLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseloadCapacityLink)

    teamCaseProgressLink = await $('[href="' + teamDefaultUrl + '/case-progress"]')
    exists = await teamCaseProgressLink.isExisting()
    expect(exists).to.be.equal(true)
    await clickAndWaitForPageLoad(teamCaseProgressLink)
    plotlyDivCases = await $('#plotly-div-cases')
    exists = await plotlyDivCases.isExisting()
    expect(exists).to.be.equal(true)
  })

  after(async function () {
    await authenticationHelp.logout()
  })
})
