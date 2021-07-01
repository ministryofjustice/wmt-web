const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.WEB_APP_DATABASE_USERNAME,
  password: config.WEB_APP_DATABASE_PASSWORD,
  database: config.DATABASE,
  // options: {
  //   encrypt: false,
  //   requestTimeout: 120000,
  //   enableArithAbort: true
  // }
}

module.exports = {
  web: {
    client: 'pg',
    connection: defaultConnection,
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    },
    acquireConnectionTimeout: 120000
  },
  archive: {
    client: 'pg',
    connection: Object.assign({}, defaultConnection, {
      database: config.ARCHIVE_DATABASE
    }),
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    }
  },
  legacy: {
    client: 'pg',
    connection: defaultConnection,
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    },
    acquireConnectionTimeout: 120000
  },
  integrationTests: {
    client: 'pg',
    connection: defaultConnection,
    debug: false,
    pool: {
      min: 0,
      max: 50,
      idleTimeoutMillis: 5000
    },
    acquireConnectionTimeout: 120000
  }
}
