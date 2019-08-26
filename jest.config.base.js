module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testEnvironment: "node",
  transformIgnorePatterns: [],
  verbose: true,
};
