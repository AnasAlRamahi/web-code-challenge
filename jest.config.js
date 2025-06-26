const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    ...tsJestTransformCfg,
  },
};