const logger = require('../logger')
const allocationsClient = require('../data/allocationsClient')

module.exports = function () {
  return async function (req, res, next) {
    try {
      if (res.locals.canAllocate) {
        res.locals.allocations = await allocationsClient.getAllocations(res.locals.user.token)
      }
      next()
    } catch (error) {
      logger.error(error, 'Failed to retrieve unallocated cases')
      next(error)
    }
  }
}
