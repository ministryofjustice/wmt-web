const restClient = require('./restClient')
const config = require('../../config')

async function getAllocations (token) {
  const res = await restClient.get({ path: `${config.apis.allocationsService.url}/cases/unallocated`, headers: { Accept: 'application/json' }, token })
  return res.length
}

module.exports = {
  getAllocations
}
