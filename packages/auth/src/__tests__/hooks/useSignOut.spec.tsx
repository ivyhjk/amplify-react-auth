import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import AuthProvider from '../../AuthProvider';
import useSignOut from '../../hooks/useSignOut';

jest.mock('aws-amplify');

describe('auth-provider.hooks.useSignOut', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    resetAuthContext();
  });

  it('should return a valid state from the context if available', async () => {
    (Auth.signOut as jest.Mock).mockImplementation(() => Promise.resolve());

    const statesSpy = jest.fn();

    function App () {
      const [doSignOut, state] = useSignOut();

      statesSpy(state);

      React.useEffect(() => {
        doSignOut();
      }, [doSignOut]);

      return null;
    }

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(Auth.signOut).toBeCalledTimes(1);
    expect(Auth.signOut).toBeCalledWith({
      global: true
    });

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
      user: undefined
    });
  });
});
