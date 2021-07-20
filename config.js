
const production = process.env.NODE_ENV === 'production'

const requiredInProduction = { requireInProduction: true }

function get (name, fallback, options = { requireInProduction: false }) {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

module.exports = {

  // Authentication (defaults for development)
  AUTHENTICATION_ENABLED: process.env.WMT_WEB_AUTHENTICATION_ENABLED || 'true',

  // Session and Cookie security (defaults for development)
  APPLICATION_SECRET: process.env.WMT_WEB_APPLICATION_SECRET, // NO DEFAULT FOR SECURITY REASONS, WILL FAIL IF NOT SET
  SECURE_COOKIE: process.env.WMT_WEB_SECURE_COOKIE || 'false',
  SESSION_COOKIE_MAXAGE: process.env.WMT_WEB_SESSION_COOKIE_MAXAGE || '3600000', // 60 min default
  RESAVE_SESSION: process.env.WMT_WEB_SESSION_COOKIE_RESAVE || 'true',
  SAVE_UNINITIALIZED_SESSION: process.env.WMT_WEB_SESSION_COOKIE_SAVE_UNINITIALISED || 'false',

  // DB
  DATABASE_SERVER: process.env.WMT_DB_SERVER || 'localhost',
  DATABASE: process.env.WMT_DB_NAME || 'postgres',
  ARCHIVE_DATABASE: process.env.WMT_DB_ARCHIVE_NAME || 'postgres',
  DB_APP_SCHEMA: 'app',

  // App
  WEB_APP_DATABASE_USERNAME: process.env.WMT_WEB_APP_DATABASE_USERNAME || 'root',
  WEB_APP_DATABASE_PASSWORD: process.env.WMT_WEB_APP_DATABASE_PASSWORD || 'dev',

  ARCHIVE_DATA_LIMIT: '10000',

  ARCHIVE_DATABASE_START_DATE: process.env.WMT_ARCHIVE_DATABASE_START_DATE || '26/08/2016',

  CURRENT_DATABASE_START_DATE: process.env.WMT_CURRENT_DATABASE_START_DATE || '07/05/2021',

  NUMBER_OF_DASHBOARD_FILES: 10,

  ARMS_COMMUNITY_MULTIPLIER: 1,
  ARMS_LICENCE_MULTIPLIER: 1,
  apis: {
    hmppsAuth: {
      url: get('HMPPS_AUTH_URL', 'http://localhost:9090/auth', requiredInProduction),
      externalUrl: get('HMPPS_AUTH_EXTERNAL_URL', get('HMPPS_AUTH_URL', 'http://localhost:9090/auth')),
      timeout: {
        response: get('HMPPS_AUTH_TIMEOUT_RESPONSE', 10000),
        deadline: get('HMPPS_AUTH_TIMEOUT_DEADLINE', 10000)
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000
      },
      apiClientId: get('API_CLIENT_ID', 'hmpps-audit-ui', requiredInProduction),
      apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret', requiredInProduction),
      systemClientId: get('SYSTEM_CLIENT_ID', 'clientid', requiredInProduction),
      systemClientSecret: get('SYSTEM_CLIENT_SECRET', 'clientsecret', requiredInProduction)
    },
    tokenVerification: {
      url: get('TOKEN_VERIFICATION_API_URL', 'http://localhost:8100', requiredInProduction),
      timeout: {
        response: get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000),
        deadline: get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000
      },
      enabled: get('TOKEN_VERIFICATION_ENABLED', 'false') === 'true'
    }
  },
  domain: get('INGRESS_URL', 'http://localhost:3000', requiredInProduction),
  https: production,
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: Number(get('WEB_SESSION_TIMEOUT_IN_MINUTES', 120))
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_AUTH_TOKEN,
    tls_enabled: get('REDIS_TLS_ENABLED', 'false')
  }
}
