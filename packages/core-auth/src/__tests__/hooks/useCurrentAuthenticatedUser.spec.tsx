import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import useCurrentAuthenticatedUser from '../../hooks/useCurrentAuthenticatedUser';

jest.mock('aws-amplify');

describe('core-auth.hooks.useCurrentAuthenticatedUser', () => {
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

    // this hook doesn't require CoreAuthProvider, has their own state
    render(<App />);

    await waitFor(jest.runAllTicks);

    expect(statesSpy).toBeCalledTimes(2);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
  });
});
