const FeatureFlagService = require('../services/featureFlagService')

const featureFlagService = new FeatureFlagService()

function featureFlagMiddleware (flagKey, flagName) {
  return async (req, res, next) => {
    const flag = await featureFlagService.getCachedFeatureflag(flagKey, flagName)
    res.locals.featureFlag = flag
    next()
  }
}

module.exports = featureFlagMiddleware
