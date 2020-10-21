const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const specReporter = new SpecReporter({
  displayStacktrace: 'all',       // display stacktrace for each failed assertion, values: (all|specs|summary|none)
  displayFailuresSummary: false,  // display summary of all failures after execution
  displayPendingSummary: false,   // display summary of all pending specs after execution
  displaySuccessfulSpec: false,   // display each successful spec
  displayFailedSpec: true,        // display each failed spec
  displayPendingSpec: false,      // display each pending spec
  displaySpecDuration: true,      // display each spec duration
  displaySuiteNumber: true,       // display each suite number (hierarchical)
  colors: {
    success: 'green',
    failure: 'red',
    pending: 'blue'
  },
  prefixes: {
    success: '✓ ',
    failure: '✗ ',
    pending: '* '
  },
  customProcessors: []
});

const htmlReporter = new HtmlScreenshotReporter({
  dest: './reports/html_report/',
  filename: 'report.html',
  ignoreSkippedSpecs: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
  showSummary: true,
  showQuickLinks: true,
  inlineImages: true
});

exports.config = {

  directConnect: true,

  baseUrl: 'https://app.letsdeel.com/',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-extensions', '--disable-infobars', '--incognito', '--no-sandbox', '--test-type=browser', '--start-maximized',
        '--window-size=1600,1200']
    }
  },

  frameworks: [
    'jasmine'
  ],

  allScriptsTimeout: 60000,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 15000,
    isVerbose: true,
    print: () => {}
  },

  suites: {
    regression: [
      './tests/sign_up.spec.js'
    ]
  },

  // Setup the report before any tests start
  beforeLaunch: () => {
    return new Promise((resolve) => {
      htmlReporter.beforeLaunch(resolve);
    });
  },

  onPrepare: async () => {
    await jasmine.getEnv().addReporter(htmlReporter);
    await jasmine.getEnv().addReporter(specReporter);

    await browser.waitForAngularEnabled(false);
    await browser.manage().timeouts().pageLoadTimeout(60000);
  },

  // Close the report after all tests finish
  afterLaunch: (exitCode) => {
    return new Promise((resolve) => {
      htmlReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
