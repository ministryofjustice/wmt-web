
const jwt = require('jsonwebtoken')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

function createToken (authorities) {
  const payload = {
    user_name: 'USER1',
    scope: ['read', 'write'],
    auth_source: 'nomis',
    authorities,
    jti: 'a610a10-cca6-41db-985f-e87efb303aaf',
    client_id: 'clientid'
  }

  return jwt.sign(payload, 'secret', { expiresIn: '1h' })
}

const req = {}
let next

function createResWithToken ({ authorities }) {
  return {
    locals: {
      user: {
        token: createToken(authorities)
      }
    },
    redirect: (redirectUrl) => {
      return redirectUrl
    }
  }
}

const logger = {
  error: sinon.stub()
}

const authorisationMiddleware = proxyquire('../../../app/middleware/authorisationMiddleware', {
  '../logger': logger
})

describe('authorisation middleware', function () {
  beforeEach(function () {
    next = sinon.spy()
  })

  it('should return next when no required roles', function () {
    const res = createResWithToken({ authorities: [] })

    authorisationMiddleware()(req, res, next)

    return next.should.have.been.calledOnce
  })

  it('should redirect when user has no authorised roles', function () {
    const res = createResWithToken({ authorities: [] })

    const authorisationResponse = authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    chai.expect(authorisationResponse).to.equal('/authError')
  })

  it('should return next when user has authorised role', function () {
    const res = createResWithToken({ authorities: ['SOME_REQUIRED_ROLE'] })

    authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    return next.should.have.been.calledOnce
  })

  it('should return next when url is refresh', function () {
    req.url = '/refresh'
    const res = {}
    authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)
    return next.should.have.been.calledOnce
  })

  it('should redirect when user has no token', function () {
    const res = {
      redirect: (redirectUrl) => {
        return redirectUrl
      }
    }
    const req = { session: {}, originalUrl: '/original' }
    const authorisationResponse = authorisationMiddleware()(req, res, next)

    chai.expect(authorisationResponse).to.equal('/login')
    chai.expect(req.session.returnTo).to.equal(req.originalUrl)
  })
})
