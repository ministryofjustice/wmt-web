const restClient = require('./restClient')

function getUser (token) {
  console.log('Getting user details: calling HMPPS Auth')
  return restClient.get({ path: '/api/me/email', token })
}

module.exports = {
  getUser
}
