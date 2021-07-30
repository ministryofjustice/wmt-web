const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const expect = require('chai').expect
const downloadUrl = '/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_20210802062147.txt'
const downloadNoFileUrl = '/probation/hmpps/0/dashboard/download?id=generated-dashboards/dashboard_doesntexist.txt'
const routeHelper = require('../../helpers/routes/route-helper')

const initaliseApp = function () {
  const userRoleService = sinon.stub()
  const hasRoleStub = sinon.stub()
  const authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  const route = proxyquire('../../../app/routes/dashboard', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  return routeHelper.buildApp(route)
}

describe('download dashboard file', function () {
  let app
  before(() => {
    app = initaliseApp()
  })

  it('should return correct dashboard file response', async () => {
    const response = await supertest(app)
      .get(downloadUrl)
      .buffer()
      .parse((res, callback) => {
        res.setEncoding('binary')
        res.data = ''
        res.on('data', (chunk) => {
          res.data += chunk
        })
        res.on('end', () => {
          callback(null, Buffer.from(res.data, 'binary'))
        })
      })

    expect(response.statusCode).to.equal(200)
    expect(response.body.toString()).to.equal('dashboard')
    expect(response.headers['content-disposition']).to.be.equal('attachment; filename=generated-dashboards/dashboard_20210802062147.txt')
    expect(response.headers['content-type']).to.be.equal('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  })

  it('should return an error when trying to download a file which doesnt exist', () => {
    return supertest(app)
      .get(downloadNoFileUrl)
      .expect(500)
  })
})
