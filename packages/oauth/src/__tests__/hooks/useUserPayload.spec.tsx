import { getCoreAuthContext } from '@ivyhjk/amplify-react-core-auth';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import useUserPayload from '../../hooks/useUserPayload';
import OAuthProvider from '../../OAuthProvider';

type CustomUser = {
  signInUserSession: {
    idToken: {
      payload: {
        foo: string;
      }
    }
  }
}

describe('oauth.hooks.useUserPayload', () => {
  jest.useFakeTimers();

  it('check a successful sign in', async () => {
    const statesSpy = jest.fn();

    function SetUser ({ children }: { children: React.ReactNode }) {
      const { dispatch, user } = React.useContext(getCoreAuthContext<CustomUser>());

      React.useEffect(() => {
        dispatch({
          loading: false,
          user: {
            signInUserSession: {
              idToken: {
                payload: {
                  foo: 'bar'
                }
              }
            }
          }
        });
      }, [dispatch]);

      if (user) {
        return (
          <React.Fragment>
            {children}
          </React.Fragment>
        );
      }

      return null;
    }

    function App () {
      const state = useUserPayload();

      statesSpy(state);

      return null;
    }

    render(
      <OAuthProvider>
        <SetUser>
          <App />
        </SetUser>
      </OAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(statesSpy).toBeCalledTimes(1);
    expect(statesSpy).toBeCalledWith({
      foo: 'bar'
    });
  });
});
