import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

import useGoogleSignOut from '../../hooks/useGoogleSignOut';
import { resetSocialAuthContext } from '../../SocialAuthContext';
import SocialAuthProvider from '../../SocialAuthProvider';
import flushPromises from '../flushPromises';

describe('social-auth-provider.hooks.useGoogleSignOut', () => {
  afterEach(() => {
    resetSocialAuthContext();
  });

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function App () {
      const [doSignOut, state] = useGoogleSignOut();

      statesSpy(state);

      expect(doSignOut).toBeTruthy();

      return null;
    }

    render(
      <SocialAuthProvider>
        <App />
      </SocialAuthProvider>
    );

    await waitFor(flushPromises);

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(statesSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
  });
});
