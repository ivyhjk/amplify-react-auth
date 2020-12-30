import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import AuthCoreProvider from '../../AuthCoreProvider';
import useCurrentAuthenticatedUser from '../../hooks/useCurrentAuthenticatedUser';

jest.mock('aws-amplify');

describe('social-auth-provider.hooks.useCurrentAuthenticatedUser', () => {
  jest.useFakeTimers();

  it('should return a valid state from the context if available', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({ foo: 'bar' }));

    const statesSpy = jest.fn();

    function App () {
      const state = useCurrentAuthenticatedUser();

      statesSpy(state);

      return null;
    }

    render(
      <AuthCoreProvider>
        <App />
      </AuthCoreProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(3, {
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
  });
});
