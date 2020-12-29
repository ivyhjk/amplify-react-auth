export const Auth = {
  currentAuthenticatedUser: jest.fn(() => Promise.resolve({
    foo: 'bar'
  })),
  signOut: jest.fn(),
  federatedSignIn: jest.fn()
};
