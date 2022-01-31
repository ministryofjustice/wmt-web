const { createClient } = require('redis')

const config = require('../../config')

const url =
  config.redis.tls_enabled === 'true'
    ? `rediss://${config.redis.host}:${config.redis.port}`
    : `redis://${config.redis.host}:${config.redis.port}`

module.exports.createRedisClient = (legacyMode = false) => {
  return createClient({
    url,
    password: config.redis.password,
    legacyMode
  })
}
