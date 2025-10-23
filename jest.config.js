module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/jest/*.test.ts"],

  // To handle @ alias imports
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
