const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl
let teamDefaultUrl

describe('View overview for staff', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    const results = await dataHelper.selectIdsForWorkloadOwner()
    workloadOwnerIds = results
    workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
    workloadOwnerDefaultUrl = '/' + workloadTypes.PROBATION + '/offender-manager/' + workloadOwnerId
    teamDefaultUrl = '/' + workloadTypes.PROBATION + '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id
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

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for managers', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Manager)
  })

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for Application Support', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
  })

  after(function () {
    authenticationHelper.logout()
  })
})

describe('overview for Super User', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.SuperUser)
  })

  after(function () {
    authenticationHelper.logout()
  })
})
