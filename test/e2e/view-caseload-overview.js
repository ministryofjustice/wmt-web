const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerGrade
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
const nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'

describe('View overview for staff', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    workloadOwnerGrade = await dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
  })

  describe('workload owner level', function () {
    beforeEach(async function () {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
    })

    it('should navigate to the workload owner overview page', async function () {
      let grade = await $('.sln-grade')
      grade = await grade.getText()
      expect(grade).to.equal(workloadOwnerGrade)
    })

    it('should not include the reductions export for staff at workload owner level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })
  })

  describe('team level', function () {
    beforeEach(async function () {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
      const teamLink = await $('[href="' + teamDefaultUrl + '"]')
      await teamLink.click()
      const teamOverviewLink = await $('[href="' + teamDefaultUrl + '/overview"]')
      await teamOverviewLink.click()
    })

    it('should navigate to the team overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Offender Manager')
    })

    it('should not include the reductions export for staff at team level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })
  })

  describe('ldu level', function () {
    beforeEach(async function () {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
      const lduLink = await $('[href="' + lduDefaultUrl + '"]')
      await lduLink.click()
      const lduOverviewLink = await $('[href="' + lduDefaultUrl + '/overview"]')
      await lduOverviewLink.click()
    })

    it('should navigate to the ldu overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Team')
    })

    it('should not include the reductions export for staff at ldu level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })
  })

  describe('region level', function () {
    beforeEach(async function () {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
      const regionLink = await $('[href="' + regionDefaultUrl + '"]')
      await regionLink.click()
    })

    it('should navigate to the region overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Probation Delivery Unit')
    })

    it('should not include the reductions export at region level', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the overview export at national level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })
  })

  describe('national level', function () {
    beforeEach(async function () {
      await browser.url(nationalDefaultUrl)
    })

    it('should navigate to the national overview page', async function () {
      const element = await $('.sln-table-org-level')
      const text = await element.getText()
      expect(text).to.equal('Region')
    })

    it('should not include the reductions export', async function () {
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download overview', async function () {
      await browser.url(nationalDefaultUrl + '/overview/caseload-csv')
      const header = await $('govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })
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
    link = await $('[href="' + workloadOwnerDefaultUrl + '"]')
    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')
  })

  it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', async function () {
    await browser.url(workloadOwnerDefaultUrl)
    let pageTitle = await $('.govuk-caption-xl')
    let text = await pageTitle.getText()
    expect(text).to.equal('Offender Manager')

    let link = await $('[href="' + nationalDefaultUrl + '"]')
    let exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    link = await $('[href="' + teamDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Team')

    link = await $('[href="' + lduDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Probation Delivery Unit')

    link = await $('[href="' + regionDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('Region')

    link = await $('[href="' + nationalDefaultUrl + '"]')
    exists = await link.isExisting()
    expect(exists).to.be.equal(true)

    await link.click()

    pageTitle = await $('.govuk-caption-xl')
    text = await pageTitle.getText()
    expect(text).to.equal('National')
  })

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for managers', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
  })
  describe('national', function () {
    it('should not include the reductions export at workload owner level', async function () {
      await browser.url(workloadOwnerDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the reductions export at national level', async function () {
      await browser.url(nationalDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should include the overview export at national level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for Application Support', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
    await browser.url(nationalDefaultUrl + '/overview')
  })

  it('should not include the overview export at national level', async function () {
    const exportButton = await $('.sln-export')
    const exists = await exportButton.isExisting()
    return expect(exists).to.be.false
  })

  it('should not be able to download overview', async function () {
    await browser.url(nationalDefaultUrl + '/overview/caseload-csv')
    const header = await $('govuk-heading-xl')
    const text = await header.getText()
    expect(text).to.equal('Access is denied')
  })

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for Super User', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.SuperUser)
  })

  it('should  include the overview export at national level', async function () {
    const exportButton = await $('.sln-export')
    const exists = await exportButton.isExisting()
    return expect(exists).to.be.true
  })

  after(function () {
    authenticationHelper.logout()
  })
})
