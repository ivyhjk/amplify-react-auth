module.exports = {
  testMatch: null,
  testRegex: '/src/__tests__/.*\\.spec\\.(ts|tsx)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleDirectories: [
    'node_modules'
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/__tests__/tsconfig.json',
      diagnostics: false
    }
  }
};
