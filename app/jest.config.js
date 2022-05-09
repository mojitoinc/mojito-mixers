/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/src",
});

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    ...paths,
  },
};
