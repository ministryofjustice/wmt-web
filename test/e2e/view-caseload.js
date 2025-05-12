const expect = require('chai').expect
const authenticationHelp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const dailyArchiveData = require('../helpers/data/setup-data')
const { navigateTo, clickAndWaitForPageLoad } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerIds = []
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
let nationalDefaultUrl
let results
let pageSubtitle
let overall, community, custody, licence
let national, region, ldu, team

describe('View your caseload flow', () => {
  before(async function () {
    await authenticationHelp.login(authenticationHelp.users.Staff)
    results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
    lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
    regionDefaultUrl = '/' + workloadTypes.PROBATION + '/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id
    nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'
  })

  describe('should navigate to the team caseload screen', () => {
    it('with the correct breadcrumbs, subnav, title and export button', async () => {
      await navigateTo(teamDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-heading-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal(dailyArchiveData.teamName)
    })

    it('with the correct caseload total summary for each case type', async () => {
      await navigateTo(teamDefaultUrl + '/caseload')
      custody = await $('#custodyTotal')
      custody = await custody.getText()
      let textTotal = custody.split('\n')

      expect(Number(textTotal[0])).to.be.greaterThan(-1)// eslint-disable-line
      expect(textTotal[1]).to.eql('Custody cases')

      community = await $('#communityTotal')
      community = await community.getText()
      textTotal = community.split('\n')
      expect(Number(textTotal[0])).to.be.greaterThan(-1) // eslint-disable-line
      expect(textTotal[1]).to.eql('Community cases')

      licence = await $('#licenseTotal')
      licence = await licence.getText()
      textTotal = licence.split('\n')
      expect(Number(textTotal[0])).to.be.greaterThan(-1) // eslint-disable-line
      expect(textTotal[1]).to.eql('License cases')
    })

    it('with the correct tabs and tables', async () => {
      await navigateTo(teamDefaultUrl + '/caseload')
      overall = await $('[href="#overall"]')
      overall = await $('#overall-enhanced')
      custody = await $('#custody-enhanced')
      community = await $('#community-enhanced')
      licence = await $('#license-enhanced')

      custody = await $('[href="#custody"]')
      await clickAndWaitForPageLoad(custody)
      custody = await $('.sln-table-caseload-custody')

      community = await $('[href="#community"]')
      await clickAndWaitForPageLoad(community)
      community = await $('.sln-table-caseload-community')

      licence = await $('[href="#license"]')
      await clickAndWaitForPageLoad(licence)
      licence = await $('.sln-table-caseload-license')
      const heading = await $('#license-enhanced .govuk-heading-m')
      const headingIsDisplayed = await heading.isDisplayed()
      return expect(headingIsDisplayed).to.be.true
    })
  })

  describe('should navigate to the LDU caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await navigateTo(lduDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-heading-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal(dailyArchiveData.lduName)

      const grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      const summary = await $('.sln-table-caseload-overall-summary')
      exists = await summary.isExisting()
      expect(exists).to.be.equal(true)

      overall = await $('[href="#overall"]')
      exists = await overall.isExisting()
      expect(exists).to.be.equal(true)

      overall = await $('#overall-enhanced')
      exists = await overall.isExisting()
      expect(exists).to.be.equal(true)

      custody = await $('#custody-enhanced')
      exists = await custody.isExisting()
      expect(exists).to.be.equal(true)

      community = await $('#community-enhanced')
      exists = await community.isExisting()
      expect(exists).to.be.equal(true)

      licence = await $('#license-enhanced')
      exists = await licence.isExisting()
      expect(exists).to.be.equal(true)

      custody = await $('[href="#custody"]')
      await clickAndWaitForPageLoad(custody)
      custody = await $('.sln-table-caseload-custody')

      community = await $('[href="#community"]')
      await clickAndWaitForPageLoad(community)
      community = await $('.sln-table-caseload-community')

      licence = await $('[href="#license"]')
      await clickAndWaitForPageLoad(licence)
      licence = await $('.sln-table-caseload-license')
      const heading = await $('#license-enhanced .govuk-heading-m')
      const headingIsDisplayed = await heading.isDisplayed()
      return expect(headingIsDisplayed).to.be.true
    })

    it('should be accessible via the Caseload tab on Team and LDUs default view', async () => {
      await navigateTo(nationalDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '"]')
      await clickAndWaitForPageLoad(region)
      ldu = await $('[href="' + lduDefaultUrl + '"]')
      await clickAndWaitForPageLoad(ldu)
      ldu = await $('[href="' + lduDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(ldu)

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      ldu = await $('[href="' + lduDefaultUrl + '/overview"]')
      await clickAndWaitForPageLoad(ldu)

      team = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(team)

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(team)
      const heading = await $('#caseloadSummary')
      const headingIsDisplayed = await heading.isDisplayed()
      return expect(headingIsDisplayed).to.be.true
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await navigateTo(teamDefaultUrl)
      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(team)

      team = await $('[href="' + teamDefaultUrl + '/case-progress"]')
      await clickAndWaitForPageLoad(team)

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(team)

      team = await $('[href="' + teamDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(team)

      team = await $('[href="' + teamDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(team)
      const heading = await $('#caseloadSummary')
      const headingIsDisplayed = await heading.isDisplayed()
      return expect(headingIsDisplayed).to.be.true
    })
  })

  describe('should navigate to the Region caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await navigateTo(regionDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-heading-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal(dailyArchiveData.regionName)
    })

    it('should be accessible via the Caseload tab on regions default view', async () => {
      await navigateTo(nationalDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '"]')
      await clickAndWaitForPageLoad(region)

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(region)

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await navigateTo(regionDefaultUrl)
      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(region)

      let grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      region = await $('[href="' + regionDefaultUrl + '/case-progress"]')
      await clickAndWaitForPageLoad(region)

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(region)

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
      region = await $('[href="' + regionDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(region)

      region = await $('[href="' + regionDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(region)

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })
  })

  describe('should navigate to the National caseload screen', () => {
    it('with the correct table, breadcrumbs and export button', async () => {
      await navigateTo(nationalDefaultUrl + '/caseload')
      pageSubtitle = await $('.govuk-heading-xl')
      pageSubtitle = await pageSubtitle.getText()
      expect(pageSubtitle).to.equal('National')
    })

    it('should be accessible via the Caseload tab on regions default view', async () => {
      await navigateTo(nationalDefaultUrl)
      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(national)

      const grade = await $('.sln-table-caseload-by-grade')
      const exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })

    it('should be accessible via the Case Progress tab when on any other tab', async () => {
      await navigateTo(nationalDefaultUrl)

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(national)

      let grade = await $('.sln-table-caseload-by-grade')
      let exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      national = await $('[href="' + nationalDefaultUrl + '/case-progress"]')
      await clickAndWaitForPageLoad(national)

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(national)

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)

      national = await $('[href="' + nationalDefaultUrl + '/caseload-capacity"]')
      await clickAndWaitForPageLoad(national)

      national = await $('[href="' + nationalDefaultUrl + '/caseload"]')
      await clickAndWaitForPageLoad(national)

      grade = await $('.sln-table-caseload-by-grade')
      exists = await grade.isExisting()
      expect(exists).to.be.equal(true)
    })
  })

  after(async function () {
    await authenticationHelp.logout()
  })
})
