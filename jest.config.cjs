/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {},
  moduleDirectories: ['node_modules', '<rootDir>'],
  testTimeout: 60000,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  watchPathIgnorePatterns: [
    '<rootDir>/db.json',
    '<rootDir>/tmp/',
    '<rootDir>/node_modules/',
  ],
};
