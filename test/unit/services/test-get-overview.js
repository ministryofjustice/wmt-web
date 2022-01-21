const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')

const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const OVERVIEW = [{
  name: 'Medway',
  totalCases: 2,
  availablePoints: 100,
  totalPoints: 50,
  contractedHours: 37,
  reductionHours: 3,
  cmsAdjustmentPoints: 0,
  linkId: 5
}]
const ORGANISATION_OVERVIEWS = {
  rows: [{ ...OVERVIEW[0], cmsPercentage: 0, capacityPercentage: 50, remainingPoints: 50 }],
  totals: {
    totalAvailablePoints: OVERVIEW[0].availablePoints,
    totalCapacityPercentage: 50,
    totalCMSPercentage: 0,
    totalCMSPoints: OVERVIEW[0].cmsAdjustmentPoints,
    totalContractedHours: OVERVIEW[0].contractedHours,
    totalPoints: OVERVIEW[0].totalPoints,
    totalReduction: OVERVIEW[0].reductionHours,
    totalRemainingPoints: 50,
    totalTotalCases: OVERVIEW[0].totalCases
  }
}

const zeroAvailablePointsOverview = [
  { ...OVERVIEW[0], availablePoints: 0 }
]

const ZERO_AVAILABLE_POINTS_OVERVIEWS = {
  rows: [{ ...zeroAvailablePointsOverview[0], cmsPercentage: 0, capacityPercentage: 0, remainingPoints: -50 }],
  totals: {
    totalAvailablePoints: zeroAvailablePointsOverview[0].availablePoints,
    totalCapacityPercentage: 0,
    totalCMSPercentage: 0,
    totalCMSPoints: zeroAvailablePointsOverview[0].cmsAdjustmentPoints,
    totalContractedHours: zeroAvailablePointsOverview[0].contractedHours,
    totalPoints: zeroAvailablePointsOverview[0].totalPoints,
    totalReduction: zeroAvailablePointsOverview[0].reductionHours,
    totalRemainingPoints: -50,
    totalTotalCases: zeroAvailablePointsOverview[0].totalCases
  }
}

const id = 1
const breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS

let getOverview
let getIndividualOverview
let getBreadcrumbs
let getOrganisationOverview

beforeEach(function () {
  getIndividualOverview = sinon.stub()
  getOrganisationOverview = sinon.stub()
  getBreadcrumbs = sinon.stub().resolves(breadcrumbs)
  getOverview =
      proxyquire('../../../app/services/get-overview',
        {
          './data/get-individual-overview': getIndividualOverview,
          './data/get-organisation-overview': getOrganisationOverview,
          './get-breadcrumbs': getBreadcrumbs
        })
})

describe('services/get-overview', function () {
  it('should call get-organisation-overview and return a results object with the correct overview details for a team', function () {
    const orgName = orgUnitConstant.TEAM.name
    getOrganisationOverview.withArgs(id, orgName).resolves(OVERVIEW)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for an LDU', function () {
    const orgName = orgUnitConstant.LDU.name
    getOrganisationOverview.withArgs(id, orgName).resolves(OVERVIEW)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for a Region', function () {
    const orgName = orgUnitConstant.REGION.name
    getOrganisationOverview.withArgs(id, orgName).resolves(OVERVIEW)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with the correct overview details for national', function () {
    const orgName = orgUnitConstant.NATIONAL.name
    getOrganisationOverview.withArgs(id, orgName).resolves(OVERVIEW)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ORGANISATION_OVERVIEWS)
    })
  })

  it('should call get-organisation-overview and return a results object with zero capacity if available points is zero', function () {
    const orgName = orgUnitConstant.REGION.name
    getOrganisationOverview.withArgs(id, orgName).resolves(zeroAvailablePointsOverview)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ZERO_AVAILABLE_POINTS_OVERVIEWS)
    })
  })
})
