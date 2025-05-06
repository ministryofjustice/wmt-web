const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')
const { navigateTo } = require('../e2e/resources/helpers/browser-helpers')

let workloadOwnerIds = []
let lduDefaultUrl

describe('LDU', function () {
  describe('View overview for staff', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Staff)
      const results = await dataHelper.selectIdsForWorkloadOwner()
      workloadOwnerIds = results
      lduDefaultUrl = '/' + workloadTypes.PROBATION + '/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id
      await navigateTo(lduDefaultUrl + '/overview')
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

    it('should not include the overview export at ldu level', async function () {
      const exportButton = await $('.sln-export')
      const exists = await exportButton.isExisting()
      return expect(exists).to.be.false
    })

    it('should not be able to download overview', async function () {
      await navigateTo(lduDefaultUrl + '/overview/caseload-csv')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    it('should not be able to download reductions', async function () {
      await navigateTo(lduDefaultUrl + '/overview/reductions-csv')
      const header = await $('.govuk-heading-xl')
      const text = await header.getText()
      expect(text).to.equal('Access is denied')
    })

    after(function () {
      authenticationHelper.logout()
    })
  })

  describe('overview for managers', function () {
    before(async function () {
      await authenticationHelper.login(authenticationHelper.users.Manager)
      await navigateTo(lduDefaultUrl + '/overview')

      it('should navigate to the ldu overview page', async function () {
        const element = await $('.sln-table-org-level')
        const text = await element.getText()
        expect(text).to.equal('Team')
      })

      it('should include the reductions export for staff at ldu level', async function () {
        const reductionExport = await $('.reduction-export')
        const exists = await reductionExport.isExisting()
        return expect(exists).to.be.true
      })

      it('should include the overview export at ldu level', async function () {
        const exportButton = await $('.sln-export')
        const exists = await exportButton.isExisting()
        return expect(exists).to.be.true
      })

      after(function () {
        authenticationHelper.logout()
      })
    })

    describe('overview for Application Support', function () {
      before(async function () {
        await authenticationHelper.login(authenticationHelper.users.ApplicationSupport)
        await navigateTo(lduDefaultUrl + '/overview')
      })

      it('should navigate to the ldu overview page', async function () {
        const element = await $('.sln-table-org-level')
        const text = await element.getText()
        expect(text).to.equal('Team')
      })

      it('should not include the reductions export at ldu level', async function () {
        const reductionExport = await $('.reduction-export')
        const exists = await reductionExport.isExisting()
        return expect(exists).to.be.false
      })

      it('should not include the overview export at ldu level', async function () {
        const exportButton = await $('.sln-export')
        const exists = await exportButton.isExisting()
        return expect(exists).to.be.false
      })

      it('should not be able to download overview', async function () {
        await navigateTo(lduDefaultUrl + '/overview/caseload-csv')
        const header = await $('.govuk-heading-xl')
        const text = await header.getText()
        expect(text).to.equal('Access is denied')
      })

      it('should not be able to download reductions', async function () {
        await navigateTo(lduDefaultUrl + '/overview/reductions-csv')
        const header = await $('.govuk-heading-xl')
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
        await navigateTo(lduDefaultUrl + '/overview')
      })

      it('should navigate to the ldu overview page', async function () {
        const element = await $('.sln-table-org-level')
        const text = await element.getText()
        expect(text).to.equal('Team')
      })

      it('should include the reductions export for staff at ldu level', async function () {
        const reductionExport = await $('.reduction-export')
        const exists = await reductionExport.isExisting()
        return expect(exists).to.be.true
      })

      it('should include the overview export at ldu level', async function () {
        const exportButton = await $('.sln-export')
        const exists = await exportButton.isExisting()
        return expect(exists).to.be.true
      })

      after(function () {
        authenticationHelper.logout()
      })
    })
  })
})
