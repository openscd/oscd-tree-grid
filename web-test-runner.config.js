import { playwrightLauncher } from '@web/test-runner-playwright';

const filteredLogs = [
  'Running in dev mode',
  'Lit is in dev mode',
  'scheduled an update',
];

const browsers = [
     playwrightLauncher({ product: 'chromium' }),
     playwrightLauncher({ product: 'firefox' }),
     playwrightLauncher({ product: 'webkit' }),
   ];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  coverage: true,

  files: 'dist/**/*.spec.js',
  coverageConfig: {
    report: true,
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    }
  },

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 3,

  /** Amount of test files per browser to test concurrently */
  concurrency: 2,

  /** Browsers to run tests on */
  browsers,

  // See documentation for all available options
});
