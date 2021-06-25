const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.WEB_APP_DATABASE_USERNAME,
  password: config.WEB_APP_DATABASE_PASSWORD,
  database: config.DATABASE,
  options: {
    encrypt: false,
    requestTimeout: 120000,
    enableArithAbort: true
  }
}

module.exports = {
  web: {
    client: 'mssql',
    connection: defaultConnection,
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  },
  archive: {
    client: 'mssql',
    connection: defaultConnection,
    debug: false,
    pool: {
      max: 500
    }
  },
  legacy: {
    client: 'mssql',
    connection: defaultConnection,
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  },
  integrationTests: {
    client: 'mssql',
    connection: defaultConnection,
    debug: false,
    pool: {
      max: 500
    },
    acquireConnectionTimeout: 120000
  }
}
