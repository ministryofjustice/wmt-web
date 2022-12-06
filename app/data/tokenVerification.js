const config = require('../../config')
const RestClient = require('./restClient')

const restClient = new RestClient(config.apis.tokenVerification)

function getApiClientToken (token) {
  return restClient.get('/token/verify', token).then(function (response) {
    return response.body && response.body.active
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
