const webpackConfig = require('./webpack.config.js') // NOTE (cw|6.4.2017) using the test config didn't work for some reason.
const srcPath = './src/'
const testPath = './test/!(support)/'

webpackConfig.entry = {}

// Karma config
module.exports = function(config) {
  var configuration = {
    port: 9876,
    basePath: '.',
    // NOTE (cw|11.2.2017) we are bundling all tests into a single bundle because
    // for some reason, importing ToneJS within each test breaks stuff when we are
    // importing it more than 7 times (???). This must have something to do with using
    // the WebAudio API and instantiating it too many times or something.
    // The consequence is that there is no straightforward way to run individual tests
    // other than overwrit
    files: [
      'test/index.js',
      // {pattern: testPath + '**/*.js', included: true},
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
      // [testPath + '**/*.js']: ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    // frameworks, browsers, & plugins
    frameworks: ['mocha', 'chai'],
    browsers: [
      // use Chrome Canary for local testing
      'ChromeCanaryHeadless',
      // 'Chrome',
      // NOTE (cw|6.4.2017) PhantomJS does *not* support the WebAudio API and never intends to, so unfortunately we can't use it.
      // 'PhantomJS',
    ],
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      // 'karma-phantomjs-launcher',
      'karma-chrome-launcher',
    ],
    customLaunchers: {
      ChromeCanaryHeadless: {
        base: 'ChromeCanary',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--remote-debugging-port=9222',
        ],
      },
      ChromeTravisHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
        ],
      },
    },

    // test reporting
    reporters: ['mocha', 'coverage'],
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'red',
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x',
      },
      showDiff: true,
    },
    coverageReporter: {
      includeAllSources: true,
      reporters: [
        {type: 'html'},
        {type: 'lcov'},
        {type: 'text'},
      ],
      dir: 'coverage',
      subdir: '.',
    },
    colors: true,
    logLevel: config.INFO,
    autoWatch: false,
    singleRun: true,
  }
  
  // when running tests on Travis CI, we should use the appropriate
  // custom launcher.
  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisHeadless'];
  }

  config.set(configuration);
};
