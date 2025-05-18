const { ReportAggregator } = require('wdio-html-nice-reporter')
const dns = require('node:dns')
let reportAggregator

exports.config = {
  services: [
    ['selenium-standalone', {
      drivers: { chrome: 'latest' },
      logPath: 'logs'
    }]
  ],

  specs: ['./e2e/**/*.js'],
  exclude: [],
  maxInstances: 1,
  baseUrl: process.env.WMT_BASE_URL || 'http://localhost:3000',
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    }
  }],
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 30000,
  connectionRetryTimeout: 60000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: ['spec',
    ['html-nice', {
      outputDir: './test_results/e2e/',
      filename: 'report.html',
      reportTitle: 'Test Report Title',
      collapseTests: false,
      useOnAfterCommandForScreenshot: false
    }]
  ],
  beforeSession: () => {
    dns.setDefaultResultOrder('ipv4first')
  },
  onPrepare: function (config, capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: './test_results/e2e/',
      filename: 'master-report.html',
      reportTitle: 'Master Report',
      browserName: capabilities.browserName,
      collapseTests: true
    })
    reportAggregator.clean()
  },
  onComplete: function () {
    (async () => {
      await reportAggregator.createReport()
    })()
  }
}
