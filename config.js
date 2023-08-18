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

  // Session and Cookie security (defaults for development)
  APPLICATION_SECRET: process.env.WMT_WEB_APPLICATION_SECRET, // NO DEFAULT FOR SECURITY REASONS, WILL FAIL IF NOT SET
  SECURE_COOKIE: process.env.WMT_WEB_SECURE_COOKIE || 'false',
  SESSION_COOKIE_MAXAGE: process.env.WMT_WEB_SESSION_COOKIE_MAXAGE || '3600000', // 60 min default
  RESAVE_SESSION: process.env.WMT_WEB_SESSION_COOKIE_RESAVE || 'true',
  SAVE_UNINITIALIZED_SESSION: process.env.WMT_WEB_SESSION_COOKIE_SAVE_UNINITIALISED || 'false',

  // DB
  LIVE_DATABASE_SERVER: process.env.WMT_LIVE_DB_SERVER || '127.0.0.1',
  LIVE_DATABASE: process.env.WMT_LIVE_DB_NAME || 'postgres',
  LIVE_DATABASE_USERNAME: process.env.WMT_LIVE_DB_USERNAME || 'root',
  LIVE_DATABASE_PASSWORD: process.env.WMT_LIVE_DB_PASSWORD || 'dev',

  HISTORY_DATABASE_SERVER: process.env.WMT_HISTORY_DB_SERVER || '127.0.0.1',
  HISTORY_DATABASE: process.env.WMT_HISTORY_DB_NAME || 'postgres',
  HISTORY_DATABASE_USERNAME: process.env.WMT_HISTORY_DB_USERNAME || 'root',
  HISTORY_DATABASE_PASSWORD: process.env.WMT_HISTORY_DB_PASSWORD || 'dev',

  ARCHIVE_DATA_LIMIT: '1000000',

  ARCHIVE_DATABASE_START_DATE: process.env.WMT_ARCHIVE_DATABASE_START_DATE || '26/08/2016',

  CURRENT_DATABASE_START_DATE: process.env.WMT_CURRENT_DATABASE_START_DATE || '07/05/2021',

  NUMBER_OF_DASHBOARD_FILES: 10,

  ARMS_COMMUNITY_MULTIPLIER: 1,
  ARMS_LICENCE_MULTIPLIER: 1,

  LEGACY_MAX_WORKLOAD_REPORT_ID: process.env.WMT_LEGACY_MAX_WORKLOAD_REPORT_ID || '639',
  ARCHIVE_MAX_WORKLOAD_REPORT_ID: process.env.WMT_ARCHIVE_MAX_WORKLOAD_REPORT_ID || '1284',

  LEGACY_MAX_WORKLOAD_ID: process.env.WMT_LEGACY_MAX_WORKLOAD_ID || '2540621',
  ARCHIVE_MAX_WORKLOAD_ID: process.env.WMT_ARCHIVE_MAX_WORKLOAD_ID || '5313915',
  APPINSIGHTS_INSTRUMENTATIONKEY: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
  apis: {
    hmppsAuth: {
      url: get('HMPPS_AUTH_URL', 'http://127.0.0.1:9090/auth', requiredInProduction),
      externalUrl: get('HMPPS_AUTH_EXTERNAL_URL', get('HMPPS_AUTH_URL', 'http://127.0.0.1:9090/auth')),
      timeout: {
        response: get('HMPPS_AUTH_TIMEOUT_RESPONSE', 3000)
      },
      agent: {
        timeout: 3000
      },
      retries: 2,
      apiClientId: get('API_CLIENT_ID', 'workload-measurement-ui', requiredInProduction),
      apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret', requiredInProduction)
    },
    allocationsService: {
      url: get('ALLOCATIONS_SERVICE_URL', 'http://127.0.0.1:8099', requiredInProduction),
      timeout: {
        response: 3000
      },
      agent: {
        timeout: 3000
      },
      retries: 2
    },
    userPreferenceService: {
      url: get('USER_PREFERENCE_SERVICE_URL', 'http://127.0.0.1:8098', requiredInProduction),
      timeout: {
        response: 2000
      },
      agent: {
        timeout: 2000
      },
      retries: 2
    },
    tokenVerification: {
      url: get('TOKEN_VERIFICATION_API_URL', 'http://127.0.0.1:8100', requiredInProduction),
      timeout: {
        response: get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 8000)
      },
      agent: {
        timeout: 8000
      },
      enabled: get('TOKEN_VERIFICATION_ENABLED', 'false') === 'true'
    }
  },
  domain: get('INGRESS_URL', 'http://localhost:3000', requiredInProduction),
  https: production,
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: Number(get('WEB_SESSION_TIMEOUT_IN_MINUTES', 720))
  },
  redis: {
    host: get('REDIS_HOST', '127.0.0.1', requiredInProduction),
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_AUTH_TOKEN,
    tls_enabled: get('REDIS_TLS_ENABLED', 'false')
  },
  dashboard: {
    region: process.env.DASHBOARD_S3_REGION || 'eu-west-2',
    endpoint: production ? null : 'http://127.0.0.1:4566',
    bucketName: process.env.DASHBOARD_AWS_BUCKET || 'wmt-web'
  },
  audit: {
    region: process.env.AUDIT_SQS_REGION || 'eu-west-2',
    endpoint: production ? null : 'http://127.0.0.1:4566',
    queueUrl: process.env.AUDIT_SQS_QUEUE_URL || 'http://127.0.0.1:4566/000000000000/audit_event_queue'
  },
  googleAnalyticsKey: get('GOOGLE_ANALYTICS_KEY', null),
  nav: {
    allocations: {
      url: get('WORKFORCE_ALLOCATIONS_URL', 'http://127.0.0.1:3010', requiredInProduction)
    }
  },
  staticResourceCacheDuration: 20
}
