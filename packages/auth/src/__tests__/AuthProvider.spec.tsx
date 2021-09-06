import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthContext } from '../AuthContext';
import AuthProvider from '../AuthProvider';

jest.mock('@aws-amplify/auth');

describe('auth-provider.AuthProvider', () => {
  jest.useFakeTimers();

  (Auth.currentAuthenticatedUser as jest.Mock)
    .mockImplementation(() => Promise.resolve({
      email: 'foo@bar.baz'
    }));

  it('should render children components', async () => {
    const rendered = render(
      <AuthProvider>
        <div className="unique">Test</div>
      </AuthProvider>
    );

    await waitFor(jest.runAllTicks);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const TestChild = () => {
      const {
        signIn,
        signOut
      } = React.useContext(getAuthContext());

      expect(signIn).toBeInstanceOf(Function);
      expect(signOut).toBeInstanceOf(Function);

      return null;
    };

    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    );

    await waitFor(jest.runAllTicks);

    expect.hasAssertions();
  });
});
