const restClient = require('./restClient')
const config = require('../../config')

async function getCaseCountByTeamCodes (token, teamCodes) {
  return await restClient.get({ path: `${config.apis.allocationsService.url}/cases/unallocated/teamCount?teams=${teamCodes.join(',')}`, headers: { Accept: 'application/json' }, token })
}

module.exports = {
  getCaseCountByTeamCodes
}
