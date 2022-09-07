const restClient = require('./restClient')
const config = require('../../config')

async function getTeamsUserPreference (token, username) {
  return await restClient.get({ path: `${config.apis.userPreferenceService.url}/users/${username}/preferences/allocation-teams`, headers: { Accept: 'application/json' }, token })
}

module.exports = {
  getTeamsUserPreference
}
