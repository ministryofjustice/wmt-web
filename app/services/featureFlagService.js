const { FliptClient } = require('@flipt-io/flipt-client-js')
const logger = require('../logger')
const config = require('../../config')

const cache = new Map()
const cacheTtl = 30 * 1000 // 30 seconds

class FeatureFlagService {
  constructor () {
    this.client = null
  }

  async fliptClient () {
    if (!this.client) {
      try {
        this.client = await FliptClient.init({
          namespace: config.fliptClient.namespace,
          url: config.fliptClient.url,
          updateInterval: config.fliptClient.timeout.response,
          authentication: {
            clientToken: config.fliptClient.apiClientSecret
          }
        })
      } catch (error) {
        logger.error(error, 'Unable to connect to feature flag service')
        throw new Error('Unable to connect to feature flag service')
      }
    }

    return this.client
  }

  async getCachedFeatureflag (flagKey, entityId) {
    const cacheKey = `${flagKey}:${entityId}`
    const now = Date.now()

    const cached = cache.get(cacheKey)
    if (cached && cached.expiresAt > now) {
      return cached.value
    }

    try {
      const client = await this.fliptClient()
      const response = await client.evaluateBoolean({
        entityId,
        flagKey,
        context: {}
      })

      const value = response?.enabled ?? false

      cache.set(cacheKey, { value, expiresAt: now + cacheTtl })
      return value
    } catch (err) {
      logger.error(`Error fetching flag "${flagKey}":`, err)
      return false
    }
  }

  async isFeatureEnabled (code, flag) {
    try {
      const client = await this.fliptClient()
      const response = await client.evaluateBoolean({
        entityId: code,
        flagKey: flag,
        context: {}
      })
      return response.enabled
    } catch (error) {
      logger.error(error, `Feature flag not found for ${flag} /${code}`)
      return false
    }
  }

  async isFeatureEnabledWithContext (code, flag, context) {
    try {
      const client = await this.fliptClient()
      const response = await client.evaluateBoolean({
        entityId: code,
        flagKey: flag,
        context
      })
      return response.enabled
    } catch (error) {
      logger.error(error, `Feature flag not found for ${flag} /${code}`)
      return false
    }
  }

  async getFeatureVariant (code, flag) {
    try {
      const client = await this.fliptClient()
      const response = await client.evaluateVariant({
        entityId: code,
        flagKey: flag,
        context: {}
      })
      return response.match
    } catch (error) {
      logger.error(error, `Feature flag not found for ${flag} /${code}`)
      return false
    }
  }

  async getFeatureVariantWithContext (code, flag, context) {
    try {
      const client = await this.fliptClient()
      const response = await client.evaluateVariant({
        entityId: code,
        flagKey: flag,
        context
      })
      return response.match
    } catch (error) {
      logger.error(error, `Feature flag not found for ${flag} /${code}`)
      return false
    }
  }
}

module.exports = FeatureFlagService
