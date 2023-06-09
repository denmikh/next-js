module.exports = {
  collectCoverageFrom: [
    'backend/**/*.js',
    '!backend/seeders/*.js',
    'frontend/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/migrations/**',
    '!frontend/js/app.js',
    '!frontend/js/c.js',
    '!frontend/js/countries.js',
    '!frontend/js/riskified.js',
    '!frontend/js/airbrake.js',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'html', 'json', 'json-summary'],
  coverageThreshold: {
    global: {
      // These represent a lower threshold so we never decrease in coverage.
      // We want to be at 100%, so bump these values incrementally as we improve
      branches: 67,
      functions: 70,
      lines: 83,
      statements: 82,
    },
  },
  globalSetup: '<rootDir>/__tests__/testDbSetup',
  globalTeardown: '<rootDir>/__tests__/testDbTeardown',
  moduleNameMapper: {
    '@backend(.*)$': '<rootDir>/backend$1',
    '@factories(.*)$': '<rootDir>/__tests__/factories$1',
    '@frontend(.*)$': '<rootDir>/frontend$1',
    '@mocks(.*)$': '<rootDir>/__mocks__$1',
    '\\.(jpg|png|svg|scss|css)$': '<rootDir>/__mocks__/empty-module.js',
    '\\.(svg)$': '<rootDir>/__mocks__/test-file-stub.js',
    '\\routes.(jpg|png|svg|scss|css)$': '<rootDir>/__mocks__/empty-module.js',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/__tests__/**/*test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  verbose: false,
};
