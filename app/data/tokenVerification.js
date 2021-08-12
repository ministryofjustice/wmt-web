const superagent = require('superagent')
const getSanitisedError = require('../sanitisedError')
const config = require('../../config')
const logger = require('../logger')

function getApiClientToken (token) {
  return superagent
    .post(`${config.apis.tokenVerification.url}/token/verify`)
    .auth(token, { type: 'bearer' })
    .timeout(config.apis.tokenVerification.timeout)
    .then(function (response) {
      return response.body && response.body.active
    })
    .catch(function (error) {
      logger.error(getSanitisedError(error), 'Error calling tokenVerificationApi')
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
