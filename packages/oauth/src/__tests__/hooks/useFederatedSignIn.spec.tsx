import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { render, waitFor } from '@testing-library/react';
import { Auth, Hub } from 'aws-amplify';
import React from 'react';

import useFederatedSignIn from '../../hooks/useFederatedSignIn';
import OAuthProvider from '../../OAuthProvider';

const AMPLIFY_SYMBOL = Symbol.for('amplify_default');

jest.mock('@aws-amplify/auth');

describe('oauth.hooks.useFederatedSignIn', () => {
  jest.useFakeTimers();

  beforeEach(async () => {
    (Auth.federatedSignIn as jest.Mock).mockClear();
    (Auth.currentAuthenticatedUser as jest.Mock).mockClear();
  });

  async function runSignIn (
    signInEvent: string,
    eventPayload: unknown
  ): Promise<jest.Mock> {
    (Auth.federatedSignIn as jest.Mock).mockImplementation(async () => {
      const response = Promise.resolve({
        accessKeyId: 'theAccessKeyIdentifier',
        sessionToken: 'theSessionToken',
        secretAccessKey: 'theSecretAccessKey',
        identityId: 'theIdentityIdentifier',
        authenticated: true
      });

      setTimeout(() => {
        Hub.dispatch(
          'auth',
          {
            event: signInEvent,
            data: eventPayload
          },
          '',
          AMPLIFY_SYMBOL
        );
      }, 100);

      return response;
    });

    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        email: 'foo@bar.baz'
      }));

    const statesSpy = jest.fn();

    function App () {
      const [doSignIn, state] = useFederatedSignIn();

      React.useEffect(() => {
        doSignIn(CognitoHostedUIIdentityProvider.Google);
      }, [doSignIn]);

      statesSpy(state);

      return null;
    }

    render(
      <OAuthProvider>
        <App />
      </OAuthProvider>
    );

    await waitFor(jest.runAllTimers);

    return statesSpy;
  }

  it('check a successful sign in', async () => {
    const events = ['signIn', 'cognitoHostedUI'];

    for (const event of events) {
      const statesSpy = await runSignIn(event, {
        foo: 'bar'
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

      // ensure that user is taken from currentAuthenticatedUser
      expect(statesSpy).toHaveBeenNthCalledWith(3, {
        error: undefined,
        loading: false,
        user: {
          email: 'foo@bar.baz'
        }
      });
    }
  });

  it('check a failed sign in', async () => {
    const events = ['signIn_failure', 'cognitoHostedUI_failure'];

    for (const event of events) {
      const statesSpy = await runSignIn(event, new Error('oops!'));

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
        error: new Error('oops!'),
        loading: false,
        user: undefined
      });
    }
  });
});
