import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import AuthProvider from '../../AuthProvider';
import useSignOut from '../../hooks/useSignOut';

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
      user: {
        foo: 'bar'
      }
    });
  });
});
