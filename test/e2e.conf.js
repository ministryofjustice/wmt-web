const { ReportAggregator } = require('wdio-html-nice-reporter')
let reportAggregator

exports.config = {
  services: [
    [
      ['selenium-standalone', { drivers: { chrome: '91.0.4472.101' } }],
      {
        logs: 'logs'
      }
    ]
  ],
  specs: ['./test/e2e/**/*.js'],
  exclude: [],
  maxInstances: 1,
  baseUrl: process.env.WMT_BASE_URL || 'http://localhost:3000',
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  sync: false,
  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 2000,
  connectionRetryTimeout: 5000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 5000
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
  }
}
