exports.config = {
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
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 50000
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
  ]
}
