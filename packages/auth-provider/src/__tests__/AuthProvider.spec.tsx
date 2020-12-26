import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthContext } from '../AuthContext';
import AuthProvider from '../AuthProvider';

jest.mock('aws-amplify');

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
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

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

  it('should update props with an error when the state changes', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

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
      error: new Error('oops!'),
      loading: false,
      user: undefined
    });
  });
});
