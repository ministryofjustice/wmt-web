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

const ZERO_AVAILABLE_POINTS_OVERVIEWS = {
  rows: [{ ...OVERVIEW[0], cmsPercentage: 0, capacityPercentage: 0, remainingPoints: 0 }],
  totals: {
    totalAvailablePoints: OVERVIEW[0].availablePoints,
    totalCapacityPercentage: 0,
    totalCMSPercentage: 0,
    totalCMSPoints: OVERVIEW[0].cmsAdjustmentPoints,
    totalContractedHours: OVERVIEW[0].contractedHours,
    totalPoints: OVERVIEW[0].totalPoints,
    totalReduction: OVERVIEW[0].reductionHours,
    totalRemainingPoints: 0,
    totalTotalCases: OVERVIEW[0].totalCases
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
    getOrganisationOverview.withArgs(id, orgName).resolves(ZERO_AVAILABLE_POINTS_OVERVIEWS)

    return getOverview(id, orgName).then(function (result) {
      assert(getOrganisationOverview.called)
      expect(result.overviewDetails).to.eql(ZERO_AVAILABLE_POINTS_OVERVIEWS)
    })
  })

  it('should return 0 contracted hours if there are indeed 0 contracted hours, and the correct overview totals', function () {
    const orgName = orgUnitConstant.REGION.name
    const totals = { name: 'Total / Average', totalContractedHours: 0, totalCapacityPercentage: 80, totalPoints: 40, totalAvailablePoints: 50, totalReduction: 3, totalRemainingPoints: 10, totalTotalCases: 2, totalCMSPoints: 0, totalCMSPercentage: 0 }
    const zeroContractedHours = Object.assign({}, OVERVIEW, { contractedHours: 0 })
    getOrganisationOverview.withArgs(id, orgName).resolves([zeroContractedHours])

    return getOverview(id, orgName).then(function (result) {
      expect(result.overviewDetails).to.eql({ rows: [zeroContractedHours], totals })
    })
  })
})
