const expect = require('chai').expect
const knex = require('../../../knex').web

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadPoints = require('../../../../app/services/data/get-workload-points')

let inserts = []
let expectedWorkloadPoints
let expectedWorkloadPointsT2A

const insertedWorkloadPoints = dataHelper.defaultWorkloadPoints

const expectedInsertedWorkloadPoints = {
  commA3: insertedWorkloadPoints.comm_tier_1,
  commA2: insertedWorkloadPoints.comm_tier_2,
  commA1: insertedWorkloadPoints.comm_tier_3,
  commA0: insertedWorkloadPoints.comm_tier_4,
  commB3: insertedWorkloadPoints.comm_tier_5,
  commB2: insertedWorkloadPoints.comm_tier_6,
  commB1: insertedWorkloadPoints.comm_tier_7,
  commB0: insertedWorkloadPoints.comm_tier_8,
  commC3: insertedWorkloadPoints.comm_tier_9,
  commC2: insertedWorkloadPoints.comm_tier_10,
  commC1: insertedWorkloadPoints.comm_tier_11,
  commC0: insertedWorkloadPoints.comm_tier_12,
  commD3: insertedWorkloadPoints.comm_tier_13,
  commD2: insertedWorkloadPoints.comm_tier_14,
  commD1: insertedWorkloadPoints.comm_tier_15,
  commD0: insertedWorkloadPoints.comm_tier_16,
  custA3: insertedWorkloadPoints.cust_tier_1,
  custA2: insertedWorkloadPoints.cust_tier_2,
  custA1: insertedWorkloadPoints.cust_tier_3,
  custA0: insertedWorkloadPoints.cust_tier_4,
  custB3: insertedWorkloadPoints.cust_tier_5,
  custB2: insertedWorkloadPoints.cust_tier_6,
  custB1: insertedWorkloadPoints.cust_tier_7,
  custB0: insertedWorkloadPoints.cust_tier_8,
  custC3: insertedWorkloadPoints.cust_tier_9,
  custC2: insertedWorkloadPoints.cust_tier_10,
  custC1: insertedWorkloadPoints.cust_tier_11,
  custC0: insertedWorkloadPoints.cust_tier_12,
  custD3: insertedWorkloadPoints.cust_tier_13,
  custD2: insertedWorkloadPoints.cust_tier_14,
  custD1: insertedWorkloadPoints.cust_tier_15,
  custD0: insertedWorkloadPoints.cust_tier_16,
  licA3: insertedWorkloadPoints.lic_tier_1,
  licA2: insertedWorkloadPoints.lic_tier_2,
  licA1: insertedWorkloadPoints.lic_tier_3,
  licA0: insertedWorkloadPoints.lic_tier_4,
  licB3: insertedWorkloadPoints.lic_tier_5,
  licB2: insertedWorkloadPoints.lic_tier_6,
  licB1: insertedWorkloadPoints.lic_tier_7,
  licB0: insertedWorkloadPoints.lic_tier_8,
  licC3: insertedWorkloadPoints.lic_tier_9,
  licC2: insertedWorkloadPoints.lic_tier_10,
  licC1: insertedWorkloadPoints.lic_tier_11,
  licC0: insertedWorkloadPoints.lic_tier_12,
  licD3: insertedWorkloadPoints.lic_tier_13,
  licD2: insertedWorkloadPoints.lic_tier_14,
  licD1: insertedWorkloadPoints.lic_tier_15,
  licD0: insertedWorkloadPoints.lic_tier_16,
  updatedByUserId: insertedWorkloadPoints.user_id,
  sdr: insertedWorkloadPoints.sdr,
  sdrConversion: insertedWorkloadPoints.sdr_conversion,
  nominalTargetPso: insertedWorkloadPoints.nominal_target_spo,
  nominalTargetPo: insertedWorkloadPoints.nominal_target_po,
  defaultContractedHoursPo: insertedWorkloadPoints.default_contracted_hours_po,
  defaultContractedHoursPso: insertedWorkloadPoints.default_contracted_hours_pso,
  weightingOverdue: insertedWorkloadPoints.weighting_o,
  weightingWarrants: insertedWorkloadPoints.weighting_w,
  weightingUpw: insertedWorkloadPoints.weighting_u,
  parom: insertedWorkloadPoints.parom,
  isT2A: insertedWorkloadPoints.is_t2a,
  defaultContractedHoursSpo: insertedWorkloadPoints.default_contracted_hours_spo
}

const getExistingActiveWorkloadPointsT2A = function () {
  return getExistingActiveWorkloadPoints(true)
}

const getExistingActiveWorkloadPoints = function (isT2A = false) {
  const whereObject = {
    is_t2a: (isT2A === true)
  }
  return knex('workload_points')
    .withSchema('app')
    .first('id AS workloadPointsId',
      'comm_tier_1 AS commA3',
      'comm_tier_2 AS commA2',
      'comm_tier_3 AS commA1',
      'comm_tier_4 AS commA0',
      'comm_tier_5 AS commB3',
      'comm_tier_6 AS commB2',
      'comm_tier_7 AS commB1',
      'comm_tier_8 AS commB0',
      'comm_tier_9 AS commC3',
      'comm_tier_10 AS commC2',
      'comm_tier_11 AS commC1',
      'comm_tier_12 AS commC0',
      'comm_tier_13 AS commD3',
      'comm_tier_14 AS commD2',
      'comm_tier_15 AS commD1',
      'comm_tier_16 AS commD0',
      'cust_tier_1 AS cusA3',
      'cust_tier_2 AS cusA2',
      'cust_tier_3 AS cusA1',
      'cust_tier_4 AS cusA0',
      'cust_tier_5 AS cusB3',
      'cust_tier_6 AS cusB2',
      'cust_tier_7 AS cusB1',
      'cust_tier_8 AS cusB0',
      'cust_tier_9 AS cusC3',
      'cust_tier_10 AS cusC2',
      'cust_tier_11 AS cusC1',
      'cust_tier_12 AS cusC0',
      'cust_tier_13 AS cusD3',
      'cust_tier_14 AS cusD2',
      'cust_tier_15 AS cusD1',
      'cust_tier_16 AS cusD0',
      'lic_tier_1 AS licA3',
      'lic_tier_2 AS licA2',
      'lic_tier_3 AS licA1',
      'lic_tier_4 AS licA0',
      'lic_tier_5 AS licB3',
      'lic_tier_6 AS licB2',
      'lic_tier_7 AS licB1',
      'lic_tier_8 AS licB0',
      'lic_tier_9 AS licC3',
      'lic_tier_10 AS licC2',
      'lic_tier_11 AS licC1',
      'lic_tier_12 AS licC0',
      'lic_tier_13 AS licD3',
      'lic_tier_14 AS licD2',
      'lic_tier_15 AS licD1',
      'lic_tier_16 AS licD0',
      'user_id AS updatedByUserId',
      'sdr AS sdr',
      'sdr_conversion AS sdrConversion',
      'nominal_target_spo AS nominalTargetPso',
      'nominal_target_po AS nominalTargetPo',
      'default_contracted_hours_po AS defaultContractedHoursPo',
      'default_contracted_hours_pso AS defaultContractedHoursPso',
      'default_contracted_hours_spo AS defaultContractedHoursSpo',
      'weighting_o AS weightingOverdue',
      'weighting_w AS weightingWarrants',
      'weighting_u AS weightingUpw',
      'weighting_arms_comm AS weightingArmsCommunity',
      'weighting_arms_lic AS weightingArmsLicense',
      'parom AS parom',
      'is_t2a AS isT2A')
    .whereNotNull('effective_from')
    .whereNull('effective_to')
    .where(whereObject)
}

describe('services/data/get-workload-points', function () {
  before(function () {
    return getExistingActiveWorkloadPoints().then(function (results) {
      expectedWorkloadPoints = results
      return getExistingActiveWorkloadPointsT2A().then(function (results) {
        expectedWorkloadPointsT2A = results
        if (expectedWorkloadPoints === undefined) {
          return dataHelper.addWorkloadPoints()
            .then(function (builtInserts) {
              inserts = builtInserts
              expectedWorkloadPoints = expectedInsertedWorkloadPoints
              if (expectedWorkloadPointsT2A === undefined) {
                return dataHelper.addWorkloadPointsT2A(builtInserts)
                  .then(function (builtInserts) {
                    inserts.concat(builtInserts)
                    expectedWorkloadPointsT2A = Object.assign({}, expectedInsertedWorkloadPoints, { isT2A: true })
                  })
              }
            })
        } else if (expectedWorkloadPointsT2A === undefined) {
          return dataHelper.addWorkloadPointsT2A()
            .then(function (builtInserts) {
              inserts = builtInserts
              expectedWorkloadPointsT2A = Object.assign({}, expectedInsertedWorkloadPoints, { isT2A: true })
            })
        }
      })
    })
  })

  it('should retrieve the latest workload points details', function () {
    return getWorkloadPoints(false).then(function (results) {
      expect(results).to.contains(expectedWorkloadPoints)
    })
  })

  it('should retrieve the latest workload points details for T2A', function () {
    return getWorkloadPoints(true).then(function (results) {
      expect(results).to.contains(expectedWorkloadPointsT2A)
    })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
