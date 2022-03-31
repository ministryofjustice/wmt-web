const restClient = require('./restClient')
const config = require('../../config')

function getAllocations (token) {
  const res = restClient.get({ path: `${config.apis.allocationsService.url}/cases/unallocated`, token })
  return res.data
}

module.exports = {
  getAllocations
}
