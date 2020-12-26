import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import AuthProvider from '../../AuthProvider';
import useSignOut from '../../hooks/useSignOut';

jest.mock('aws-amplify');

describe('auth-provider.hooks.useSignOut', () => {
  jest.useFakeTimers();

  afterEach(() => {
    resetAuthContext();
  });

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function App () {
      const [doSignOut, state] = useSignOut();

      statesSpy(state);

      expect(doSignOut).toBeTruthy();

      return null;
    }

    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: { foo: 'bar' }
    });
  });
});
