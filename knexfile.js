const config = require('./config')
const liveConnection = {
  host: config.LIVE_DATABASE_SERVER,
  user: config.LIVE_DATABASE_USERNAME,
  password: config.LIVE_DATABASE_PASSWORD,
  database: config.LIVE_DATABASE
}

const historyConnection = {
  host: config.HISTORY_DATABASE_SERVER,
  user: config.HISTORY_DATABASE_USERNAME,
  password: config.HISTORY_DATABASE_PASSWORD,
  database: config.HISTORY_DATABASE
}

module.exports = {
  web: {
    client: 'pg',
    connection: liveConnection,
    debug: false,
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 8000,
      acquireTimeoutMillis: 8000,
      idleTimeoutMillis: 8000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 5000
  },
  archive: {
    client: 'pg',
    connection: historyConnection,
    debug: false,
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 8000,
      acquireTimeoutMillis: 8000,
      idleTimeoutMillis: 8000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 5000
  },
  legacy: {
    client: 'pg',
    connection: historyConnection,
    debug: false,
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 8000,
      acquireTimeoutMillis: 8000,
      idleTimeoutMillis: 8000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 5000
  },
  integrationTests: {
    client: 'pg',
    connection: liveConnection,
    debug: false,
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 8000,
      acquireTimeoutMillis: 8000,
      idleTimeoutMillis: 8000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100
    },
    acquireConnectionTimeout: 5000
  }
}
