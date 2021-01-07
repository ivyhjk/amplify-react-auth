import { act, render, waitFor } from '@testing-library/react';
import { Auth, Hub } from 'aws-amplify';
import React from 'react';

import { getOAuthContext } from '../OAuthContext';
import OAuthProvider from '../OAuthProvider';

const AMPLIFY_SYMBOL = Symbol.for('amplify_default');

jest.mock('@aws-amplify/auth');

describe('oauth.OAuthProvider', () => {
  jest.useFakeTimers();

  beforeEach(async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockClear();
  });

  it('should render children components', async () => {
    const rendered = render(
      <OAuthProvider>
        <div className="unique">Test</div>
      </OAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const TestChild = () => {
      const {
        error,
        federatedSignIn,
        loading,
        signOut,
        user
      } = React.useContext(getOAuthContext());

      expect(error).toBeUndefined();
      expect(loading).toBe(false);
      expect(user).toBeUndefined();

      expect(federatedSignIn).toBeInstanceOf(Function);
      expect(signOut).toBeInstanceOf(Function);

      return null;
    };

    render(
      <OAuthProvider>
        <TestChild />
      </OAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect.hasAssertions();
  });

  const doRenderSpy = async () => {
    const stateSpy = jest.fn();

    const TestChild = () => {
      const {
        error,
        loading,
        user
      } = React.useContext(getOAuthContext());

      stateSpy({
        error,
        loading,
        user
      });

      return null;
    };

    render(
      <OAuthProvider>
        <TestChild />
      </OAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    return stateSpy;
  };

  it('should listen sign in events in hub', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        email: 'foo@bar.baz'
      }));

    const signInEvents = ['signIn', 'cognitoHostedUI'];

    for (const signInEvent of signInEvents) {
      const stateSpy = await doRenderSpy();

      expect(stateSpy).toBeCalledTimes(1);
      expect(stateSpy).toHaveBeenNthCalledWith(1, {
        error: undefined,
        loading: false,
        user: undefined
      });

      act(() => {
        Hub.dispatch(
          'auth',
          {
            event: signInEvent,
            data: {
              foo: 'bar'
            }
          },
          '',
          AMPLIFY_SYMBOL
        );
      });

      await waitFor(jest.runOnlyPendingTimers);

      expect(stateSpy).toBeCalledTimes(2);
      expect(stateSpy).toHaveBeenNthCalledWith(2, {
        error: undefined,
        loading: false,
        user: {
          email: 'foo@bar.baz'
        }
      });
    }
  });

  it('should listen sign in failure events in hub', async () => {
    const signInFailureEvents = ['signIn_failure', 'cognitoHostedUI_failure'];

    for (const signInFailureEvent of signInFailureEvents) {
      const stateSpy = await doRenderSpy();

      expect(stateSpy).toBeCalledTimes(1);
      expect(stateSpy).toHaveBeenNthCalledWith(1, {
        error: undefined,
        loading: false,
        user: undefined
      });

      act(() => {
        Hub.dispatch(
          'auth',
          {
            event: signInFailureEvent,
            data: new Error('oops!')
          },
          '',
          AMPLIFY_SYMBOL
        );
      });

      await waitFor(jest.runOnlyPendingTimers);

      expect(stateSpy).toBeCalledTimes(2);
      expect(stateSpy).toHaveBeenNthCalledWith(2, {
        error: new Error('oops!'),
        loading: false,
        user: undefined
      });
    }
  });
});
