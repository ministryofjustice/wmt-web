const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.userPreferenceService)

async function getTeamsUserPreference (token, username) {
  return await restClient.get(`/users/${username}/preferences/allocation-teams`, token)
}

module.exports = {
  getTeamsUserPreference
}
