const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CONTRACTED_HOURS = 37.5
const UPDATED_CONTRACTED_HOURS = 22

const id = 1
const breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
const expectedTitle = breadcrumbs[0].title
const expectedSubTitile = 'Offender Management'

let contractedHoursService
let getBreadcrumbs
let getContractedHoursForWorkloadOwner
let updateContractedHoursForWorkloadOwner
let createWorkloadPointsRecalculationTask
let getLatestIdsForWpRecalc

const recalcIds = { workloadStagingId: 3, workloadReportId: 2 }

beforeEach(function () {
  getContractedHoursForWorkloadOwner = sinon.stub()
  updateContractedHoursForWorkloadOwner = sinon.stub()
  createWorkloadPointsRecalculationTask = sinon.stub()
  getBreadcrumbs = sinon.stub().resolves(breadcrumbs)
  getLatestIdsForWpRecalc = sinon.stub().resolves(recalcIds)
  contractedHoursService =
    proxyquire('../../../app/services/contracted-hours-service',
      {
        './data/get-contracted-hours-for-workload-owner': getContractedHoursForWorkloadOwner,
        './data/update-contracted-hours-for-workload-owner': updateContractedHoursForWorkloadOwner,
        './data/create-calculate-workload-points-task': createWorkloadPointsRecalculationTask,
        './data/get-latest-workload-staging-id-and-workload-report-id': getLatestIdsForWpRecalc,
        './get-breadcrumbs': getBreadcrumbs,
        './audit-service': { auditContractedHoursEdited: sinon.stub().resolves() },
        './data/get-offender-manager-team-ldu-region': sinon.stub().resolves()
      })
})

describe('services/contracted-hours-service', function () {
  describe('getContractedHours - standard OM', function () {
    it('should call get-breadcrumbs and return a results object with breadcrumbs, title, subtitle and contracted hours', function () {
      getContractedHoursForWorkloadOwner.withArgs(id).resolves(CONTRACTED_HOURS)
      return contractedHoursService.getContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name)
        .then(function (result) {
          assert(getBreadcrumbs.calledWith(id, orgUnitConstant.OFFENDER_MANAGER.name))
          expect(result.breadcrumbs).to.eql(breadcrumbs)
          expect(result.subTitle).to.eql(expectedSubTitile)
          expect(result.title).to.eql(expectedTitle)
          expect(result.contractedHours).to.eql(CONTRACTED_HOURS)
        })
    })

    it('should call get-contracted-hours-for-workload-owner with the correct parameters', function () {
      getContractedHoursForWorkloadOwner.withArgs(id).resolves(CONTRACTED_HOURS)
      return contractedHoursService.getContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name)
        .then(function () {
        expect(getContractedHoursForWorkloadOwner.calledWith(id)).to.be.true //eslint-disable-line
        })
    })
  })

  describe('updateContractedHours - standard OM', function () {
    it('should call update-contracted-hours-for-workload-owner with correct parameters', function () {
      updateContractedHoursForWorkloadOwner.withArgs(id, UPDATED_CONTRACTED_HOURS).resolves(1)
      return contractedHoursService.updateContractedHours(id, UPDATED_CONTRACTED_HOURS)
        .then(function () {
        expect(updateContractedHoursForWorkloadOwner.calledWith(id, UPDATED_CONTRACTED_HOURS)).to.be.true //eslint-disable-line
        expect(getLatestIdsForWpRecalc.calledWith(id)).to.be.true //eslint-disable-line
        expect(createWorkloadPointsRecalculationTask.calledWith(3, 2)).to.be.true //eslint-disable-line
        })
    })
  })
})
