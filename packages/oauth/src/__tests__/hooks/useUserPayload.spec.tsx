import { render, waitFor } from '@testing-library/react';
import React from 'react';

import useUserPayload from '../../hooks/useUserPayload';
import MockedOAuthProvider from '../../tests/MockedOAuthProvider';

describe('oauth.hooks.useUserPayload', () => {
  jest.useFakeTimers();

  it('check a successful sign in', async () => {
    const statesSpy = jest.fn();

    function App () {
      const state = useUserPayload();

      statesSpy(state);

      return null;
    }

    const user = {
      signInUserSession: {
        idToken: {
          payload: {
            foo: 'bar'
          }
        }
      }
    };

    render(
      <MockedOAuthProvider user={user}>
        <App />
      </MockedOAuthProvider>
    );

    await waitFor(jest.runAllTicks);

    expect(statesSpy).toBeCalledTimes(1);
    expect(statesSpy).toBeCalledWith({
      foo: 'bar'
    });
  });
});
