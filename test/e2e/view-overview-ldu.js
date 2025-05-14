const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let lduDefaultUrl

async function validateAndGetLduUrl () {
  const results = await dataHelper.selectIdsForWorkloadOwner()

  console.log('🔍 Workload Owner ID Results:', JSON.stringify(results, null, 2))

  const ldu = results.find(item => item.table === 'ldu')
  if (!ldu || !ldu.id) {
    throw new Error('Could not find a valid LDU from workload owner ID selection.')
  }

  return `/${workloadTypes.PROBATION}/ldu/${ldu.id}`
}

async function safeElementExists (selector, timeout = 300) {
  try {
    const element = await $(selector)
    await element.waitForExist({ timeout })
    return await element.isExisting()
  } catch (err) {
    console.warn(`Element ${selector} not found within ${timeout}ms`)
    return false
  }
}

describe('LDU Overview Page', function () {
  before(async function () {
    await authenticationHelper.login(authenticationHelper.users.Staff)
    lduDefaultUrl = await validateAndGetLduUrl()
    await authenticationHelper.logout()
  })

  function testForUserRole (roleName, expectations) {
    describe(`as ${roleName}`, function () {
      before(async function () {
        await authenticationHelper.login(authenticationHelper.users[roleName])
        await browser.execute(() => console.log('User role:', window.userRole || 'unknown'))
        await navigateTo(`${lduDefaultUrl}/overview`)
      })

      after(async function () {
        await authenticationHelper.logout()
      })

      it('should navigate to the LDU overview page', async function () {
        this.retries(2)

        const element = await $('.sln-table-org-level')

        const exists = await element.isExisting()
        expect(exists).to.equal(true)

        await element.waitForDisplayed({ timeout: 60000 })

        const text = await element.getText()
        expect(text).to.equal('Team')
      })

      it(`should ${expectations.showReductionsExport ? '' : 'not '}show reductions export`, async function () {
        const exists = await safeElementExists('.reduction-export')
        expect(exists).to.equal(expectations.showReductionsExport)
      })

      it(`should ${expectations.showOverviewExport ? '' : 'not '}show overview export`, async function () {
        const exists = await safeElementExists('.sln-export')
        expect(exists).to.equal(expectations.showOverviewExport)
      })

      if (!expectations.allowCsvDownloads) {
        it('should block overview CSV download', async function () {
          await navigateTo(`${lduDefaultUrl}/overview/caseload-csv`)
          const header = await $('.govuk-heading-xl')
          await header.waitForDisplayed({ timeout: 60000 })
          const text = await header.getText()
          expect(text).to.equal('Access is denied')
        })

        it('should block reductions CSV download', async function () {
          await navigateTo(`${lduDefaultUrl}/overview/reductions-csv`)
          const header = await $('.govuk-heading-xl')
          await header.waitForDisplayed({ timeout: 60000 })
          const text = await header.getText()
          expect(text).to.equal('Access is denied')
        })
      }
    })
  }

  testForUserRole('Staff', {
    showReductionsExport: false,
    showOverviewExport: false,
    allowCsvDownloads: false
  })

  testForUserRole('Manager', {
    showReductionsExport: true,
    showOverviewExport: true,
    allowCsvDownloads: true
  })

  testForUserRole('ApplicationSupport', {
    showReductionsExport: false,
    showOverviewExport: false,
    allowCsvDownloads: false
  })

  testForUserRole('SuperUser', {
    showReductionsExport: true,
    showOverviewExport: true,
    allowCsvDownloads: true
  })
})
