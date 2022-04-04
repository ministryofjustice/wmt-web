const restClient = require('./restClient')
const config = require('../../config')

function getAllocations (token) {
  const res = restClient.get({ path: `${config.apis.allocationsService.url}/cases/unallocated`, headers: { Accept: 'application/json' }, token })
  console.log(res.data)
  return res.data
}

module.exports = {
  getAllocations
}
