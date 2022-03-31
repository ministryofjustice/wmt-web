const allocationsClient = require('../data/allocationsClient')

module.exports = async function (token) {
  return await allocationsClient.getAllocations(token)
}
