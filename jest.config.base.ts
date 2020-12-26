import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  projects: [
    '<rootDir>/packages/*/jest.config.ts'
  ],
  testRegex: '/__tests__/.*\\.spec\\.(ts|tsx)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'node'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest'
  },
  moduleDirectories: [
    'node_modules'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/__tests__/tsconfig.json',
      diagnostics: false
    }
  }
};

export default config;
