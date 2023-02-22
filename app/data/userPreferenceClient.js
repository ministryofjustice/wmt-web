const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.userPreferenceService)

async function getAllocationDemandSelection (token, username) {
  const result = await restClient.get(`/users/${username}/preferences/allocation-demand`, token)
  return result.items.at(0) ? JSON.parse(result.items.at(0)) : { pdu: '', ldu: '', team: '' }
}

module.exports = {
  getAllocationDemandSelection
}
