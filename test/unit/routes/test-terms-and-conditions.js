const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')

const TERMS_CONDITIONS_URL = '/terms-and-conditions'

let app
let route

before(function () {
  route = require('../../../app/routes/terms-and-conditions')
  app = routeHelper.buildApp(route)
})

describe('terms and conditions route', function () {
  it('should respond with 200 when terms and conditions route is requested', function () {
    return supertest(app).get(TERMS_CONDITIONS_URL).expect(200)
  })
})
