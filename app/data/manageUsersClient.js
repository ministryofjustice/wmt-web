const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.manageUsersService)

function getUserEmail (token) {
  return restClient.get('/users/me/email', token)
}

function getUser (token) {
  return restClient.get('/users/me', token)
}

module.exports = {
  getUser, getUserEmail
}
