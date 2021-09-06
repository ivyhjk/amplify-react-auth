import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import useSignOut from '../../hooks/useSignOut';
import MockedOAuthProvider from '../../tests/MockedOAuthProvider';

jest.mock('aws-amplify');

describe('oauth.hooks.useSignOut', () => {
  jest.useFakeTimers();

  it('should do a successfuly sign out', async () => {
    (Auth.signOut as jest.Mock).mockImplementation(() => Promise.resolve());

    const statesSpy = jest.fn();

    function App () {
      const [doSignIn] = useSignOut();

      React.useEffect(() => {
        doSignIn();
      }, [doSignIn]);

      return null;
    }

    const user = {
      foo: 'bar'
    };

    render(
      <MockedOAuthProvider user={user} dispatch={statesSpy}>
        <App />
      </MockedOAuthProvider>
    );

    await waitFor(jest.runAllTicks);

    expect(Auth.signOut).toBeCalledTimes(1);
    expect(Auth.signOut).toBeCalledWith();

    expect(statesSpy).toBeCalledTimes(2);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: false,
      user: undefined
    });
  });
});
