const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const WORKLOAD_POINTS_T2A_URL = '/admin/workload-points/t2a'
const INVALID_WORKLOAD_POINTS_T2A_URL = '/admin/workload-points/t2s'
const WORKLOAD_POINTS_URL = '/admin/workload-points'
const INVALID_WORKLOAD_POINTS_URL = '/admin/workload-pnts'

const WORKLOAD_POINTS = {
  title: 'Workload Points',
  subTitle: 'Admin',
  breadcrumbs: [{}],
  workloadPoints: []
}

const WORKLOAD_POINTS_TO_POST = {
  previousWpId: '2',
  commA3: '206',
  commA2: '158',
  commA1: '146',
  commA0: '110',
  commB3: '146',
  commB2: '115',
  commB1: '102',
  commB0: '72',
  commC3: '79',
  commC2: '63',
  commC1: '50',
  commC0: '35',
  commD3: '51',
  commD2: '41',
  commD1: '29',
  commD0: '29',
  cusA3: '75',
  cusA2: '60',
  cusA1: '59',
  cusA0: '0',
  cusB3: '59',
  cusB2: '48',
  cusB1: '47',
  cusB0: '0',
  cusC3: '30',
  cusC2: '24',
  cusC1: '23',
  cusC0: '0',
  cusD3: '17',
  cusD2: '14',
  cusD1: '13',
  cusD0: '0',
  licA3: '219',
  licA2: '175',
  licA1: '163',
  licA0: '0',
  licB3: '161',
  licB2: '132',
  licB1: '119',
  licB0: '0',
  licC3: '77',
  licC2: '65',
  licC1: '52',
  licC0: '0',
  licD3: '51',
  licD2: '43',
  licD1: '31',
  licD0: '0',
  sdr: '101',
  userId: '35',
  sdrConversion: '51',
  nominalTargetPso: '2001',
  nominalTargetPo: '2001',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  defaultContractedHoursPo: '37',
  defaultContractedHoursPso: '37',
  parom: '121',
  weightingArmsCommunity: '15',
  weightingArmsLicense: '10',
  isT2A: 'false',
  defaultContractedHoursSpo: '0',
  adjustment1: '1',
  adjustment2: '2',
  adjustment3: '3',
  adjustment4: '4',
  adjustment5: '5',
  adjustment6: '6',
  adjustment7: '7',
  adjustment8: '8',
  adjustment9: '9',
  adjustment10: '10',
  adjustment11: '11',
  adjustment12: '12',
  adjustment13: '13',
  adjustment14: '14',
  adjustment15: '15',
  adjustment16: '16',
  adjustment17: '17',
  adjustment18: '18',
  adjustment19: '19',
  adjustment20: '20',
  adjustment21: '21',
  adjustment22: '22',
  adjustment23: '23',
  adjustment24: '24',
  adjustment25: '25',
  adjustment26: '26',
  adjustment27: '27',
  adjustment28: '28',
  adjustment29: '29',
  adjustment30: '30',
  adjustment31: '31',
  adjustment32: '32',
  adjustment33: '33',
  adjustment34: '34',
  adjustment35: '35',
  adjustment36: '36',
  adjustment46: '37',
  adjustment38: '38',
  adjustment43: '39',
  adjustment37: '40',
  adjustment40: '41',
  adjustment41: '42',
  adjustment44: '43',
  adjustment42: '44',
  adjustment39: '45',
  adjustment45: '46'
}

const WORKLOAD_POINTS_T2A_TO_POST = {
  previousWpId: '3',
  commA3: '75',
  commA2: '60',
  commA1: '59',
  commA0: '0',
  commB3: '59',
  commB2: '48',
  commB1: '47',
  commB0: '0',
  commC3: '30',
  commC2: '24',
  commC1: '23',
  commC0: '0',
  commD3: '17',
  commD2: '14',
  commD1: '13',
  commD0: '0',
  cusA3: '75',
  cusA2: '60',
  cusA1: '59',
  cusA0: '0',
  cusB3: '59',
  cusB2: '48',
  cusB1: '47',
  cusB0: '0',
  cusC3: '30',
  cusC2: '24',
  cusC1: '23',
  cusC0: '0',
  cusD3: '17',
  cusD2: '14',
  cusD1: '13',
  cusD0: '0',

  licA3: '75',
  licA2: '60',
  licA1: '59',
  licA0: '0',
  licB3: '59',
  licB2: '48',
  licB1: '47',
  licB0: '0',
  licC3: '30',
  licC2: '24',
  licC1: '23',
  licC0: '0',
  licD3: '17',
  licD2: '14',
  licD1: '13',
  licD0: '0',
  userId: '35',
  weightingOverdue: '0.0',
  weightingWarrants: '0.0',
  weightingUpw: '100.0',
  isT2A: 'true'
}

const MOCK_USERNAME = {
  username: 'username'
}

const MOCK_USER = {
  user: MOCK_USERNAME
}

let app
let route
let workloadPointsService
let authorisationService
const hasRoleResult = true
let getAdjustmentPointsConfig
let updateAdjustmentPointsConfig

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: sinon.stub().returns(hasRoleResult)
  }
  workloadPointsService = {
    getWorkloadPoints: sinon.stub().resolves(WORKLOAD_POINTS),
    updateWorkloadPoints: sinon.stub().resolves({})
  }
  getAdjustmentPointsConfig = sinon.stub().resolves([
    {
      adjustmentId: 46,
      contactCode: 'NGS001',
      contactDescription: 'GS Rights and Responsibilities session NS',
      categoryId: 2,
      points: 1
    }
  ])
  updateAdjustmentPointsConfig = sinon.stub().resolves()
  route = proxyquire('../../../app/routes/workload-points', {
    '../services/workload-points-service': workloadPointsService,
    '../authorisation': authorisationService,
    '../services/data/get-adjustment-points-config': getAdjustmentPointsConfig,
    '../services/data/update-adjustment-points-config': updateAdjustmentPointsConfig
  })
  app = routeHelper.buildApp(route)
})

describe('Admin Workload Points route', function () {
  it('should respond with 200 when the correct admin/workload-points url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_URL).expect(200)
      .then(function () {
      expect(workloadPointsService.getWorkloadPoints.calledWith(false)).to.be.true //eslint-disable-line
      })
  })

  it('should respond with 500 when an incorrect url is called', function () {
    return supertest(app).get(INVALID_WORKLOAD_POINTS_URL).expect(500)
  })

  it('should post the correct data and respond with 302', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_URL)
      .send(MOCK_USER)
      .send(WORKLOAD_POINTS_TO_POST)
      .expect(302, 'Found. Redirecting to /admin/workload-points?success=true')
  })
})

describe('Admin Workload Points T2A route', function () {
  it('should respond with 200 when the correct admin/workload-points/t2a url is called', function () {
    return supertest(app).get(WORKLOAD_POINTS_T2A_URL).expect(200)
      .then(function () {
      expect(workloadPointsService.getWorkloadPoints.calledWith(true)).to.be.true //eslint-disable-line
      })
  })

  it('should respond with 500 when an incorrect url is called for t2a', function () {
    return supertest(app).get(INVALID_WORKLOAD_POINTS_T2A_URL).expect(500)
  })

  it('should respond with 200 when the correct post admin/workload-points/t2a url is called', function () {
    return supertest(app)
      .post(WORKLOAD_POINTS_T2A_URL)
      .send(MOCK_USER)
      .send(WORKLOAD_POINTS_T2A_TO_POST)
      .expect(302, 'Found. Redirecting to /admin/workload-points/t2a?success=true')
  })
})
