const config = require('../../config')
const RestClient = require('./restClient')

const restClient = new RestClient(config.apis.tokenVerification)

function getApiClientToken (token) {
  return restClient.post('/token/verify', token).then(function ({ active }) {
    return Boolean(active)
  }).catch(function () {
    return false
  })
}

async function tokenVerifier (request) {
  const { user, verified } = request

  if (!config.apis.tokenVerification.enabled) {
    return true
  }

  if (verified) {
    return true
  }

  const result = await getApiClientToken(user.token)
  if (result) {
    request.verified = true
  }
  return result
}

module.exports = tokenVerifier
