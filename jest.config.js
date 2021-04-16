/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  transform: {},
  testTimeout: 20000,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  //preset: "jest-puppeteer",
  testEnvironment: "node",
  globalSetup: "./src/context/setup.js",
  globalTeardown: "./src/context/teardown.js",
  testEnvironment: "./src/context/puppeteer_environment.js",
};
