import type { Config } from '@jest/types';

import baseConfig from '../../jest.config.base';

const config: Config.InitialOptions = {
  ...baseConfig,
  testEnvironment: 'node',
  setupFiles: [
    '<rootDir>/src/__tests__/jest.setup.js'
  ],
  preset: 'react-native',
  transform: {
    '^.+\\.(js)$': '<rootDir>/../../node_modules/react-native/jest/preprocessor.js',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

export default config;
