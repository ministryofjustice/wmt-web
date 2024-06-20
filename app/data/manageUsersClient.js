const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.hmppsAuth)

function getUserEmail (token) {
  return restClient.get('/api/me/email', token)
}

function getUser (token) {
  return restClient.get('api/user/me', token)
}

module.exports = {
  getUser, getUserEmail
}
