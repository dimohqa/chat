const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, './'),
  moduleDirectories: ['node_modules'],
  testMatch: ['**/src/**/__tests__/**/*.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['./dist'],
  moduleNameMapper: {
    '\\.css$': require.resolve('./mocks/test-mock.js'),
    '\\.png$': require.resolve('./mocks/test-mock.js'),
    '\\.eot$': require.resolve('./mocks/test-mock.js'),
    '\\.woff$': require.resolve('./mocks/test-mock.js'),
    '\\.woff2$': require.resolve('./mocks/test-mock.js'),
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
