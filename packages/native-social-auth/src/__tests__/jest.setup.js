import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(),
    revokeAccess: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED'
  }
}));
