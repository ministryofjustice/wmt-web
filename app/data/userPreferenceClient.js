const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.userPreferenceService)

async function getAllocationDemandSelection (token, username) {
  const { items = [] } = await restClient.get(`/users/${username}/preferences/allocation-demand`, token)
  const item = items.at(0)

  if (!item) return { pdu: '', ldu: '', team: '' }

  return typeof item === 'string' ? JSON.parse(item) : item
}

module.exports = {
  getAllocationDemandSelection
}
