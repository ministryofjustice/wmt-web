const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')

const COOKIES_URL = '/cookies'

let app
let route

before(function () {
  route = require('../../../app/routes/cookies')
  app = routeHelper.buildApp(route)
})

describe('cookies route', function () {
  it('should respond with 200 when the cookies route is requested', function () {
    return supertest(app).get(COOKIES_URL).expect(200)
  })
})
