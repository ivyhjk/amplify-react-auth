import { render } from '@testing-library/react';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import AuthProvider from '../../AuthProvider';
import useSignOut from '../../hooks/useSignOut';

describe('auth-provider.hooks.useSignOut', () => {
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

    expect(statesSpy).toBeCalledTimes(1);

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });
  });
});
