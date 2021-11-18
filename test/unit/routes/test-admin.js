const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const ADMIN_URL = '/admin/'
const loggedInUser = 'loggedInUser'

let app
let route
let userRoleService
let authorisationService
const hasRoleStub = sinon.stub()

const setupLoggedInUserMiddleware = function () {
  return function (req, res, next) {
    req.user = {
      username: loggedInUser
    }
    next()
  }
}

const initaliseApp = function () {
  userRoleService = sinon.stub()
  authorisationService = {

    hasRole: hasRoleStub
  }
  route = proxyquire('../../../app/routes/admin', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route, setupLoggedInUserMiddleware())
}

before(function () {
  initaliseApp()
})

describe('admin route', function () {
  it('should respond with 200 when the user has the admin role', function () {
    return supertest(app).get(ADMIN_URL).expect(200)
  })
})
