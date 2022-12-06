const RestClient = require('./restClient')
const config = require('../../config')

const restClient = new RestClient(config.apis.allocationsService)

async function getCaseCountByTeamCodes (token, teamCodes) {
  return await restClient.get(`/cases/unallocated/teamCount?teams=${teamCodes.join(',')}`, token)
}

module.exports = {
  getCaseCountByTeamCodes
}
