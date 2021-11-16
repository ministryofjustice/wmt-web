const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const { removeDomainFromUsername } = require('../../../app/services/user-role-service')
const userRoles = require('../../../app/constants/user-roles')
const USERNAME = {
  username: 'john.smith@email.com'
}
const loggedInUser = 'loggedInUser'

const USER_URL = '/admin/user'
const USER_RIGHT_URL = '/admin/user-rights'
const EDIT_USER_RIGHTS_URL = `${USER_RIGHT_URL}/${USERNAME.username}`

const INVALID_USERNAME = {
  username: 'john.smith'
}

let app
let route
let userRoleService
let authorisationService
const hasRoleStub = sinon.stub()
const getRoleByUsernameStub = sinon.stub()
const getUserByUsernameStub = sinon.stub()
const getRoleStub = sinon.stub()

const initaliseApp = function (middleware) {
  userRoleService = {
    getUserByUsername: getUserByUsernameStub,
    getRoleByUsername: getRoleByUsernameStub,
    getRole: getRoleStub,
    removeDomainFromUsername
  }
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  route = proxyquire('../../../app/routes/user-rights', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route, middleware)
}

const setupLoggedInUserMiddleware = function () {
  return function (req, res, next) {
    req.user = {
      username: loggedInUser
    }
    next()
  }
}

describe('user rights route', function () {
  before(function () {
    initaliseApp(setupLoggedInUserMiddleware())
  })

  it('should respond with 200 when user right is called', function () {
    return supertest(app).get(USER_URL).expect(200)
  })

  it('should respond with 302 when posting an invalid username', function () {
    return supertest(app)
      .post(USER_RIGHT_URL)
      .send(INVALID_USERNAME).expect(302)
  })

  it('should respond with 200 when posting a role for a user', function () {
    getRoleByUsernameStub.resolves({
      fullname: 'Full Name',
      role: 'Role'
    })
    return supertest(app)
      .post(USER_RIGHT_URL)
      .send(USERNAME).expect(200)
  })

  it('should not be able to create a Super User when loggedin user is system admin', function () {
    getUserByUsernameStub.withArgs(loggedInUser).resolves({
      username: loggedInUser
    })
    getRoleByUsernameStub.withArgs(loggedInUser).resolves({
      role: userRoles.SYSTEM_ADMIN
    })
    getUserByUsernameStub.resolves()
    getRoleStub.resolves({
      role: userRoles.SUPER_USER
    })
    return supertest(app)
      .post(EDIT_USER_RIGHTS_URL)
      .send({
        rights: userRoles.SUPER_USER,
        fullname: 'Full Name'
      }).expect(403)
  })

  it('should not be able to update to a Super User when loggedin user is system admin', function () {
    getUserByUsernameStub.withArgs(loggedInUser).resolves({
      username: loggedInUser
    })
    getRoleByUsernameStub.withArgs(loggedInUser).resolves({
      role: userRoles.SYSTEM_ADMIN
    })
    getUserByUsernameStub.withArgs(removeDomainFromUsername(USERNAME.username)).resolves({
      username: 'john.smith'
    })
    getRoleStub.resolves({
      role: userRoles.SUPER_USER
    })
    return supertest(app)
      .post(EDIT_USER_RIGHTS_URL)
      .send({
        rights: userRoles.SUPER_USER,
        fullname: 'Full Name'
      }).expect(403)
  })
})
