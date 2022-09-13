const restClient = require('./restClient')
const config = require('../../config')

function getUserEmail (token) {
  return restClient.get({ path: `${config.apis.hmppsAuth.url}/api/me/email`, token })
}

function getUser (token) {
  return restClient.get({ path: `${config.apis.hmppsAuth.url}/api/user/me`, token })
}

module.exports = {
  getUser, getUserEmail
}
