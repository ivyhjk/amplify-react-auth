import { render } from '@testing-library/react';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import AuthProvider from '../../AuthProvider';
import useSignIn from '../../hooks/useSignIn';

describe('auth-provider.hooks.useSignIn', () => {
  afterEach(() => {
    resetAuthContext();
  });

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function App () {
      const [doSignIn, state] = useSignIn();

      statesSpy(state);

      expect(doSignIn).toBeTruthy();

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
