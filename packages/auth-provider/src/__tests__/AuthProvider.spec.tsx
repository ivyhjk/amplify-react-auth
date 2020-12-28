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
    const contextSpy = jest.fn();

    const TestChild = () => {
      const {
        error,
        loading,
        signIn,
        signOut,
        user
      } = React.useContext(getAuthContext());

      contextSpy({
        error,
        loading,
        user
      });

      expect(signIn).toBeTruthy();
      expect(signOut).toBeTruthy();

      return null;
    };

    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(contextSpy).toBeCalledTimes(3);

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
  });
});
