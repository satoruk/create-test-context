const base = require("../../jest.config.base.js");
const pack = require("./package");
const path = require("path");

const packDirName = path.basename(__dirname);
const packageRootDir = `<rootDir>/packages/${packDirName}`;

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  rootDir: "../..",
  testMatch: [`${packageRootDir}/**/*.test.ts`],
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  testEnvironment: "node",
};
