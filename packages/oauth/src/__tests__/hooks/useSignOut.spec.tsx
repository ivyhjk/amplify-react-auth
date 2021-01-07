import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import useSignOut from '../../hooks/useSignOut';
import OAuthProvider from '../../OAuthProvider';

jest.mock('aws-amplify');

describe('oauth.hooks.useSignOut', () => {
  jest.useFakeTimers();

  it('should do a successfuly sign out', async () => {
    (Auth.signOut as jest.Mock).mockImplementation(() => Promise.resolve());

    const statesSpy = jest.fn();

    function App () {
      const [doSignIn, state] = useSignOut();

      React.useEffect(() => {
        doSignIn();
      }, [doSignIn]);

      statesSpy(state);

      return null;
    }

    render(
      <OAuthProvider>
        <App />
      </OAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(Auth.signOut).toBeCalledTimes(1);
    expect(Auth.signOut).toBeCalledWith();

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
