export const Auth = {
  currentAuthenticatedUser: jest.fn(() => Promise.resolve({
    foo: 'bar'
  })),
  signIn: jest.fn(),
  signOut: jest.fn()
};
