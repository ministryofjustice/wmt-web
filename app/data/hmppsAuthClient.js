const restClient = require('./restClient')
const config = require('../../config')

function getUser (token) {
  return restClient.get({ path: `${config.apis.hmppsAuth.url}/api/me/email`, token })
}

module.exports = {
  getUser
}
