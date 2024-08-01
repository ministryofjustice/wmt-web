const caseType = require('../../app/constants/case-type')

const CASELOAD = {
  name: 'Todd Umptious',
  caseType: caseType.CUSTODY,
  grade: 'PO',
  id: 1,
  totalCases: 3,
  untiered: 0,
  a3: 1,
  a2: 2,
  a1: 3,
  a0: 4,
  b3: 5,
  b2: 6,
  b1: 7,
  b0: 8,
  c3: 9,
  c2: 10,
  c1: 11,
  c0: 12,
  d3: 13,
  d2: 14,
  d1: 15,
  d0: 16,
  a3s: 17,
  a2s: 18,
  a1s: 19,
  a0s: 20,
  b3s: 21,
  b2s: 22,
  b1s: 23,
  b0s: 24,
  c3s: 25,
  c2s: 26,
  c1s: 27,
  c0s: 28,
  d3s: 29,
  d2s: 30,
  d1s: 31,
  d0s: 32
}

// linkId = 2, grade = PO
const CUSTODY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 9, caseType: caseType.LICENCE })
module.exports.OVERALL_CASELOAD_PO_0 = Object.assign({}, CASELOAD, { linkId: 2, totalCases: 18, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96 })

// linkId = 3, grade = PO
const CUSTODY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 10, caseType: caseType.LICENCE, name: 'Jerry Twig' })
module.exports.OVERALL_CASELOAD_PO_1 = Object.assign({}, CASELOAD, { linkId: 3, totalCases: 19, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96, name: 'Jerry Twig' })

// linkId = 4, grade = PO
const CUSTODY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 11, caseType: caseType.LICENCE, name: 'Jemima Racktool' })
module.exports.OVERALL_CASELOAD_PO_2 = Object.assign({}, CASELOAD, { linkId: 4, totalCases: 20, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96, name: 'Jemima Racktool' })

// linkId = 2, grade = PSO
const CUSTODY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', caseType: caseType.CUSTODY })
const COMMUNITY_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 6, caseType: caseType.COMMUNITY })
const LICENSE_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 9, caseType: caseType.LICENCE })
module.exports.OVERALL_CASELOAD_PSO_0 = Object.assign({}, CASELOAD, { linkId: 2, grade: 'PSO', totalCases: 18, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96 })

// linkId = 3, grade = PSO
const CUSTODY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, caseType: caseType.CUSTODY, name: 'Jerry Twig' })
const COMMUNITY_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jerry Twig' })
const LICENSE_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 10, caseType: caseType.LICENCE, name: 'Jerry Twig' })
module.exports.OVERALL_CASELOAD_PSO_1 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 3, totalCases: 19, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96, name: 'Jerry Twig' })

// linkId = 4, grade = PSO
const CUSTODY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, caseType: caseType.CUSTODY, name: 'Jemima Racktool' })
const COMMUNITY_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 6, caseType: caseType.COMMUNITY, name: 'Jemima Racktool' })
const LICENSE_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 11, caseType: caseType.LICENCE, name: 'Jemima Racktool' })
module.exports.OVERALL_CASELOAD_PSO_2 = Object.assign({}, CASELOAD, { grade: 'PSO', linkId: 4, totalCases: 20, untiered: 0, a3: 3, a2: 6, a1: 9, a0: 12, b3: 15, b2: 18, b1: 21, b0: 24, c3: 27, c2: 30, c1: 33, c0: 36, d3: 39, d2: 42, d1: 45, d0: 48, a3s: 51, a2s: 54, a1s: 57, a0s: 60, b3s: 63, b2s: 66, b1s: 69, b0s: 72, c3s: 75, c2s: 78, c1s: 81, c0s: 84, d3s: 87, d2s: 90, d1s: 93, d0s: 96, name: 'Jemima Racktool' })

module.exports.LDU_OVERALL_SUMMARY_LINKID_2 = { name: 'Todd Umptious', linkId: 2, totalCases: 36, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 18 }
module.exports.LDU_OVERALL_SUMMARY_LINKID_3 = { name: 'Jerry Twig', linkId: 3, totalCases: 38, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 20 }
module.exports.LDU_OVERALL_SUMMARY_LINKID_4 = { name: 'Jemima Racktool', linkId: 4, totalCases: 40, custodyTotalCases: 6, communityTotalCases: 12, licenseTotalCases: 22 }

// In team caseload the linkId is workloadOwner Id so is unique
// ie only 3 entries (commuity, custody,license) for each linkId
// Means we don't worry about grade in team caseloads
module.exports.TEAM_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

module.exports.TEAM_COMMUNITY_RESULTS = [COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2]
module.exports.TEAM_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2]
module.exports.TEAM_LICENSE_RESULTS = [LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2]

// In ldu linkId is teamId, shared by multiple workload owners
// Means we need to have same linkIds with mulitple grades
module.exports.LDU_CASELOAD = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  COMMUNITY_CASELOAD_PO_0, COMMUNITY_CASELOAD_PO_1, COMMUNITY_CASELOAD_PO_2,
  LICENSE_CASELOAD_PO_0, LICENSE_CASELOAD_PO_1, LICENSE_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2,
  COMMUNITY_CASELOAD_PSO_0, COMMUNITY_CASELOAD_PSO_1, COMMUNITY_CASELOAD_PSO_2,
  LICENSE_CASELOAD_PSO_0, LICENSE_CASELOAD_PSO_1, LICENSE_CASELOAD_PSO_2]

module.exports.LDU_CUSTODY_RESULTS = [CUSTODY_CASELOAD_PO_0, CUSTODY_CASELOAD_PO_1, CUSTODY_CASELOAD_PO_2,
  CUSTODY_CASELOAD_PSO_0, CUSTODY_CASELOAD_PSO_1, CUSTODY_CASELOAD_PSO_2]

module.exports.LDU_CUSTODY_AGGREGATED_RESULTS = {
  details:
  [{
    linkId: 2,
    name: 'Todd Umptious',
    grades: [
      { grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 },
      { grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 }
    ]
  },
  {
    linkId: 3,
    name: 'Jerry Twig',
    grades: [
      { grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 },
      { grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 }
    ]
  },
  {
    linkId: 4,
    name: 'Jemima Racktool',
    grades: [
      { grade: CUSTODY_CASELOAD_PO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 },
      { grade: CUSTODY_CASELOAD_PSO_0.grade, totalCases: 3, untiered: 0, a3: 1, a2: 2, a1: 3, a0: 4, b3: 5, b2: 6, b1: 7, b0: 8, c3: 9, c2: 10, c1: 11, c0: 12, d3: 13, d2: 14, d1: 15, d0: 16, a3s: 17, a2s: 18, a1s: 19, a0s: 20, b3s: 21, b2s: 22, b1s: 23, b0s: 24, c3s: 25, c2s: 26, c1s: 27, c0s: 28, d3s: 29, d2s: 30, d1s: 31, d0s: 32 }
    ]
  }],
  totals:
  {
    PO:
  {
    grade: 'PO',
    untiered: 0,
    a3: 3,
    a2: 6,
    a1: 9,
    a0: 12,
    b3: 15,
    b2: 18,
    b1: 21,
    b0: 24,
    c3: 27,
    c2: 30,
    c1: 33,
    c0: 36,
    d3: 39,
    d2: 42,
    d1: 45,
    d0: 48,
    a3s: 51,
    a2s: 54,
    a1s: 57,
    a0s: 60,
    b3s: 63,
    b2s: 66,
    b1s: 69,
    b0s: 72,
    c3s: 75,
    c2s: 78,
    c1s: 81,
    c0s: 84,
    d3s: 87,
    d2s: 90,
    d1s: 93,
    d0s: 96,
    totalCases: 9,
    numberOfType: 3
  },
    PSO:
    {
      grade: 'PSO',
      untiered: 0,
      a3: 3,
      a2: 6,
      a1: 9,
      a0: 12,
      b3: 15,
      b2: 18,
      b1: 21,
      b0: 24,
      c3: 27,
      c2: 30,
      c1: 33,
      c0: 36,
      d3: 39,
      d2: 42,
      d1: 45,
      d0: 48,
      a3s: 51,
      a2s: 54,
      a1s: 57,
      a0s: 60,
      b3s: 63,
      b2s: 66,
      b1s: 69,
      b0s: 72,
      c3s: 75,
      c2s: 78,
      c1s: 81,
      c0s: 84,
      d3s: 87,
      d2s: 90,
      d1s: 93,
      d0s: 96,
      totalCases: 9,
      numberOfType: 3
    }
  },
  detailsPercentages:
  [{
    linkId: 2,
    name: 'Todd Umptious',
    grades: [{ grade: 'PO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 },
      { grade: 'PSO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 }]
  },
  {
    linkId: 3,
    name: 'Jerry Twig',
    grades: [{ grade: 'PO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 },
      { grade: 'PSO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 }]
  },
  {
    linkId: 4,
    name: 'Jemima Racktool',
    grades: [{ grade: 'PO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 },
      { grade: 'PSO', a3: 50, a2: 50, a1: 50, a0: 50, b3: 50, b2: 50, b1: 50, b0: 50, c3: 50, c2: 50, c1: 50, c0: 50, d3: 50, d2: 50, d1: 50, d0: 50, a3s: 50, a2s: 50, a1s: 50, a0s: 50, b3s: 50, b2s: 50, b1s: 50, b0s: 50, c3s: 50, c2s: 50, c1s: 50, c0s: 50, d3s: 50, d2s: 50, d1s: 50, d0s: 50, untiered: 0, totalCases: 50 }]
  }],
  percentageTotals:
  {
    PO:
  {
    grade: 'PO',
    a3: 50,
    a2: 50,
    a1: 50,
    a0: 50,
    b3: 50,
    b2: 50,
    b1: 50,
    b0: 50,
    c3: 50,
    c2: 50,
    c1: 50,
    c0: 50,
    d3: 50,
    d2: 50,
    d1: 50,
    d0: 50,
    a3s: 50,
    a2s: 50,
    a1s: 50,
    a0s: 50,
    b3s: 50,
    b2s: 50,
    b1s: 50,
    b0s: 50,
    c3s: 50,
    c2s: 50,
    c1s: 50,
    c0s: 50,
    d3s: 50,
    d2s: 50,
    d1s: 50,
    d0s: 50,
    untiered: 0,
    totalCases: 50,
    numberOfType: 3
  },
    PSO:
    {
      grade: 'PSO',
      a3: 50,
      a2: 50,
      a1: 50,
      a0: 50,
      b3: 50,
      b2: 50,
      b1: 50,
      b0: 50,
      c3: 50,
      c2: 50,
      c1: 50,
      c0: 50,
      d3: 50,
      d2: 50,
      d1: 50,
      d0: 50,
      a3s: 50,
      a2s: 50,
      a1s: 50,
      a0s: 50,
      b3s: 50,
      b2s: 50,
      b1s: 50,
      b0s: 50,
      c3s: 50,
      c2s: 50,
      c1s: 50,
      c0s: 50,
      d3s: 50,
      d2s: 50,
      d1s: 50,
      d0s: 50,
      untiered: 0,
      totalCases: 50,
      numberOfType: 3
    }
  }
}
