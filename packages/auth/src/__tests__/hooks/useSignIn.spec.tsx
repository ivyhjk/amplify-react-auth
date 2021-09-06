import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { resetAuthContext } from '../../AuthContext';
import useSignIn from '../../hooks/useSignIn';
import MockedAuthProvider from '../../tests/MockedAuthProvider';

jest.mock('aws-amplify');

describe('auth-provider.hooks.useSignIn', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    resetAuthContext();
  });

  it('should return a valid state from the context if available', async () => {
    (Auth.signIn as jest.Mock).mockImplementation(() => Promise.resolve({
      foo: 'bar'
    }));

    const statesSpy = jest.fn();

    function App () {
      const [doSignIn] = useSignIn();

      React.useEffect(() => {
        doSignIn('theUsername', 'thePassword');
      }, [doSignIn]);

      return null;
    }

    render(
      <MockedAuthProvider dispatch={statesSpy}>
        <App />
      </MockedAuthProvider>
    );

    await waitFor(jest.runAllTicks);

    expect(Auth.signIn).toBeCalledTimes(1);
    expect(Auth.signIn).toBeCalledWith({
      username: 'theUsername',
      password: 'thePassword'
    });

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
