const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const config = require('../../config')
const dailyArchiveData = require('../helpers/data/setup-data')
const { clickAndWaitForPageLoad, navigateTo } = require('../e2e/resources/helpers/browser-helpers')
const axios = require('axios')
const jwt = require('jsonwebtoken')

let workloadOwnerIds = []
let workloadOwnerId
let workloadOwnerDefaultUrl
let teamDefaultUrl
let lduDefaultUrl
let regionDefaultUrl
const nationalDefaultUrl = '/' + workloadTypes.PROBATION + '/hmpps/0'

describe('National', function () {
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
    })

    beforeEach(async function () {
      await navigateTo(nationalDefaultUrl)
    })

    it('should display allocations link', async function () {
      const allocationsLink = await $(`a[href*="${config.nav.allocations.url}"`)
      const exists = await allocationsLink.isExisting()
      return expect(exists).to.be.true
    })

    it('should display number of unallocated cases', async function () {
      const allocationsNumber = await $('#notifications')
      await allocationsNumber.waitForDisplayed({ timeout: 30000 })
      const number = await allocationsNumber.getText()
      return expect(number).to.equal('+42')
    })

    it('should show regional breakdown table', async function () {
      const element = await $('.sln-table-org-level')
      await element.waitForDisplayed({ timeout: 30000 })
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

    it('should allow the user to navigate down the org hierarchy from the national page', async function () {
      await navigateTo(nationalDefaultUrl + '/overview')
      let pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      let text = await pageTitle.getText()
      expect(text).to.equal('National')
      let link = await $('[href="' + regionDefaultUrl + '"]')
      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.regionName)
      link = await $('[href="' + lduDefaultUrl + '"]')
      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)
      link = await $('[href="' + teamDefaultUrl + '"]')
      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.teamName)
      link = await $('[href="' + workloadOwnerDefaultUrl + '"]')
      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.omNameDisplayed)
    })

    it('should contain breadcrumbs which allow the user to navigate up the org hierarchy', async function () {
      await navigateTo(workloadOwnerDefaultUrl)
      let pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      let text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.omNameDisplayed)

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

      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.teamName)

      link = await $('[href="' + lduDefaultUrl + '"]')
      exists = await link.isExisting()
      expect(exists).to.be.equal(true)

      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.lduName)

      link = await $('[href="' + regionDefaultUrl + '"]')
      exists = await link.isExisting()
      expect(exists).to.be.equal(true)

      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal(dailyArchiveData.regionName)

      link = await $('[href="' + nationalDefaultUrl + '"]')
      exists = await link.isExisting()
      expect(exists).to.be.equal(true)

      await clickAndWaitForPageLoad(link)

      pageTitle = await $('.govuk-heading-xl')
      await pageTitle.waitForDisplayed({ timeout: 30000 })
      text = await pageTitle.getText()
      expect(text).to.equal('National')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
    })

    it('should display allocations link', async function () {
      const allocationsLink = await $(`a[href*="${config.nav.allocations.url}"`)
      const exists = await allocationsLink.isExisting()
      return expect(exists).to.be.true
    })

    it('should not include the reductions export at workload owner level', async function () {
      await navigateTo(workloadOwnerDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should not include the reductions export', async function () {
      await navigateTo(nationalDefaultUrl + '/overview')
      const reductionExport = await $('.reduction-export')
      const exists = await reductionExport.isExisting()
      return expect(exists).to.be.false
    })

    it('should include the overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    describe('with error', function () {
      before(async function () {
        const { data } = await axios.get(`${config.apis.manageUsersService.url}/__admin/mappings`)
        const { mappings } = data
        const { id } = mappings.find(m => m.request.urlPathPattern === '/users/.*/preferences/allocation-demand')

        await axios.put(`${config.apis.manageUsersService.url}/__admin/mappings/${id}`,
          {
            request: {
              urlPathPattern: '/users/.*/preferences/allocation-demand',
              method: 'GET'
            },
            response: {
              headers: {
                'Content-Type': 'application/json'
              },
              status: 500
            }
          }
        )

        await authenticationHelper.login(authenticationHelper.users.Manager)
      })

      it('should fall back to + when number of unallocated cases cannot be retrieved', async function () {
        const allocationsNumber = await $('#notifications')
        await allocationsNumber.waitForDisplayed({ timeout: 30000 })
        const number = await allocationsNumber.getText()
        return expect(number).to.equal('+')
      })

      after(async function () {
        await axios.post(`${config.apis.manageUsersService.url}/__admin/mappings/reset`)
      })
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for Application Support', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
      await navigateTo(nationalDefaultUrl + '/overview')
    })

    it('should display allocations link', async function () {
      const allocationsLink = await $(`a[href*="${config.nav.allocations.url}"`)
      await allocationsLink.waitForDisplayed({ timeout: 30000 })
      const exists = await allocationsLink.isExisting()
      return expect(exists).to.be.true
    })

    it('should not include the overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download overview', async function () {
      await navigateTo(nationalDefaultUrl + '/overview/caseload-csv')
      const header = await $('.govuk-heading-xl')
      await header.waitForDisplayed({ timeout: 30000 })
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for Super User', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.SuperUser)
    })

    it('should display allocations link', async function () {
      const allocationsLink = await $(`a[href*="${config.nav.allocations.url}"`)
      const exists = await allocationsLink.isExisting()
      return expect(exists).to.be.true
    })

    it('should  include the overview export', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.true
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })

  describe('overview for only WMT User', function () {
    before(async function () {
      const { data } = await axios.get(`${config.apis.manageUsersService.url}/__admin/mappings`)
      const { mappings } = data
      const { id } = mappings.find(m => m.request.urlPattern === '/auth/oauth/token')

      function createToken (authorities) {
        const payload = {
          user_name: 'USER1',
          scope: ['read', 'write'],
          auth_source: 'nomis',
          authorities,
          jti: 'a610a10-cca6-41db-985f-e87efb303aaf',
          client_id: 'clientid'
        }

        return jwt.sign(payload, 'secret', { expiresIn: '1h' })
      }

      await axios.put(`${config.apis.manageUsersService.url}/__admin/mappings/${id}`, {
        request: {
          urlPattern: '/auth/oauth/token',
          method: 'POST'
        },
        response: {
          status: 200,
          jsonBody: {
            access_token: createToken(['ROLE_WORKLOAD_MEASUREMENT']),
            token_type: 'bearer',
            user_name: 'USER1',
            expires_in: 599,
            scope: 'read',
            internalUser: true
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Location: 'http://localhost:3000/login/callback?code=codexxxx&state=stateyyyy'
          }
        }
      })

      await authenticationHelper.login(authenticationHelper.users.onlyWmtUser)
    })

    it('should not display allocations link', async function () {
      const allocationsLink = await $(`a[href*="${config.nav.allocations.url}"`)
      const exists = await allocationsLink.isExisting()
      return expect(exists).to.be.false
    })

    after(async function () {
      await authenticationHelper.logout()
    })
  })
})
