import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { getAuthContext } from '../AuthContext';
import AuthProvider from '../AuthProvider';

describe('auth-provider.AuthProvider', () => {
  jest.useFakeTimers();

  it('should render children components', async () => {
    const rendered = render(
      <AuthProvider>
        <div className="unique">Test</div>
      </AuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const TestChild = () => {
      const {
        error,
        loading,
        signIn,
        signOut,
        user
      } = React.useContext(getAuthContext());

      expect(error).toBeUndefined();
      expect(loading).toBe(false);
      expect(user).toBeUndefined();

      expect(signIn).toBeInstanceOf(Function);
      expect(signOut).toBeInstanceOf(Function);

      return null;
    };

    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect.hasAssertions();
  });
});
