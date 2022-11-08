const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const crDataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl

describe('View court-reports overview', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
    const results = await crDataHelper.selectIdsForCourtReporterWorkloadOwner()
    teamDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/team/' + results.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/ldu/' + results.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/region/' + results.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/hmpps/0'
  })

  it('should navigate to the team court-reports overview page', async function () {
    await browser.url(teamDefaultUrl + '/overview')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const overviewTable = await $('.sln-table-overview')
    exists = await overviewTable.isExisting()
    expect(exists).to.be.equal(true)

    const orgLevelTable = await $('.sln-table-org-level')
    const text = await orgLevelTable.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should naviagte to the ldu court-reports overview page', async function () {
    await browser.url(lduDefaultUrl + '/overview')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const link = await $('[href="' + teamDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    const overviewTable = await $('.sln-table-overview')
    exists = await overviewTable.isExisting()
    expect(exists).to.be.equal(true)

    const orgLevelTable = await $('.sln-table-org-level')
    const text = await orgLevelTable.getText()
    expect(text).to.equal('Team')
  })

  it('should naviagte to the region court-reports overview page', async function () {
    await browser.url(regionDefaultUrl + '/overview')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    const overviewTable = await $('.sln-table-overview')
    exists = await overviewTable.isExisting()
    expect(exists).to.be.equal(true)

    const orgLevelTable = await $('.sln-table-org-level')
    const text = await orgLevelTable.getText()
    expect(text).to.equal('Probation Delivery Unit')
  })

  it('should navigate to the national court-reports overview page', async function () {
    await browser.url(nationalDefaultUrl + '/overview')

    const breadcrumbs = await $('.govuk-breadcrumbs')
    let exists = await breadcrumbs.isExisting()
    expect(exists).to.be.equal(true)

    const subnav = await $('.moj-sub-navigation__list')
    exists = await subnav.isExisting()
    expect(exists).to.be.equal(true)

    const link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    const overviewTable = await $('.sln-table-overview')
    exists = await overviewTable.isExisting()
    expect(exists).to.be.equal(true)

    const orgLevelTable = await $('.sln-table-org-level')
    const text = await orgLevelTable.getText()
    expect(text).to.equal('Region')
  })

  it('should allow the user to navigate down the org hierarchy from the national page', async function () {
    await browser.url(nationalDefaultUrl + '/overview')

    let pageTitle = await $('.govuk-caption-xl')
    let text = await pageTitle.getText()
    expect(text).to.equal('National')

    let link = await $('[href="' + regionDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Region')

    link = await $('[href="' + lduDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')

    link = await $('[href="' + teamDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Team')
  })

  it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', async function () {
    await browser.url(teamDefaultUrl)
    let pageTitle = await $('.govuk-caption-xl')
    let text = await pageTitle.getText()
    expect(text).to.equal('Team')

    let link = await $('[href="' + nationalDefaultUrl + '"]')
    let exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + lduDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')

    link = await $('[href="' + regionDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Region')

    link = await $('[href="' + nationalDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('National')
  })

  after(function () {
    authenticationHelper.logout()
  })
})
