import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getCoreAuthContext, resetCoreAuthContext } from '../../CoreAuthContext';
import CoreAuthProvider from '../../CoreAuthProvider';
import useAuthentication from '../../hooks/useAuthentication';

type CustomUser = {
  foo?: string;
  bar?: string;
}

jest.mock('aws-amplify');

describe('core-auth.hooks.useAuthentication', () => {
  jest.useFakeTimers();

  it('should return a valid state from the context if available', async () => {
    resetCoreAuthContext();

    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    const statesSpy = jest.fn();

    function SetAuthentication () {
      const { dispatch, loading } = React.useContext(getCoreAuthContext<CustomUser>());

      React.useEffect(() => {
        if (!loading) {
          dispatch({
            loading: false,
            user: {
              bar: 'baz'
            }
          });
        }
      }, [dispatch, loading]);

      return <App />;
    }

    function App () {
      const state = useAuthentication();

      statesSpy(state);

      return null;
    }

    render(
      <CoreAuthProvider>
        <SetAuthentication />
      </CoreAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      loading: true
    });
    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      loading: false,
      error: undefined,
      user: {
        foo: 'bar'
      }
    });
    expect(statesSpy).toHaveBeenNthCalledWith(3, {
      loading: false,
      user: {
        bar: 'baz'
      }
    });
  });
});
