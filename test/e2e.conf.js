const { ReportAggregator } = require('wdio-html-nice-reporter')
const dns = require('node:dns')
let reportAggregator

exports.config = {
  services: [
    [
      ['selenium-standalone', { drivers: { chrome: 'latest' } }],
      {
        logs: 'logs'
      }
    ]
  ],
  specs: ['./e2e/**/*.js'],
  maxInstances: 1,
  baseUrl: process.env.WMT_BASE_URL || 'http://localhost:3000',
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    browserVersion: 'stable',
    'wdio:enforceWebDriverClassic': true
  }],
  sync: false,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 50000,
  connectionRetryTimeout: 120000,
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

      // to show the report in a browser when done
      collapseTests: false,
      // to turn on screenshots after every test
      useOnAfterCommandForScreenshot: false
    }
    ]
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
  onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
      await reportAggregator.createReport()
    })()
  },
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      const timestamp = new Date().toISOString().replace(/:/g, '-')
      const fileName = `${test.title.replace(/\s+/g, '_')}-${timestamp}.png`
      const filePath = `./test_results/e2e/screenshots/${fileName}`

      await browser.saveScreenshot(filePath)
      console.log(`Screenshot captured: ${filePath}`)
    }
  }
}
