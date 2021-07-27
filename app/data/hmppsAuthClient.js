const restClient = require('./restClient')

function getUser (token) {
  return restClient.get({ path: '/api/me/email', token })
}

module.exports = {
  getUser
}
