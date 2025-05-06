const { ReportAggregator } = require('wdio-html-nice-reporter')
const dns = require('node:dns')
let reportAggregator

exports.config = {
  services: [
    [
      ['selenium-standalone', { drivers: { chrome: 'latest' } },
        'devtools'],
      {
        logs: 'logs'
      }
    ]
  ],

  specs: ['./e2e/**/*.js'],
  beforeCommand: async function (commandName, args) {
    const navigationCommands = ['url', 'click', 'navigateTo']

    if (navigationCommands.includes(commandName)) {
      // If it's a navigation, wait after it
      await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === 'complete',
        {
          timeout: 60000,
          timeoutMsg: `Page did not fully load after ${commandName}`
        }
      )
    }
  },

  exclude: [],
  maxInstances: 1,
  baseUrl: process.env.WMT_BASE_URL || 'http://localhost:3000',
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  sync: false,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 50000,
  connectionRetryTimeout: 50000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
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
  }
}
