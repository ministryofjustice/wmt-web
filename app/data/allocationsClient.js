const restClient = require('./restClient')
const config = require('../../config')

async function getAllocations (token) {
  const res = await restClient.get({ path: `${config.apis.allocationsService.url}/cases/unallocated/count`, headers: { Accept: 'application/json' }, token })
  return res.count
}

module.exports = {
  getAllocations
}
