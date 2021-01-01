import {
  GoogleSignin
} from '@react-native-community/google-signin';
import { render, waitFor } from '@testing-library/react-native';
import { Auth } from 'aws-amplify';
import React from 'react';

import useGoogleSignOut from '../../hooks/useGoogleSignOut';
import { resetSocialAuthContext } from '../../SocialAuthContext';
import SocialAuthProvider from '../../SocialAuthProvider';
import flushPromises from '../flushPromises';

jest.mock('aws-amplify');

describe('social-auth-provider.hooks.useGoogleSignOut', () => {
  beforeEach(async () => {
    resetSocialAuthContext();

    (GoogleSignin.revokeAccess as jest.Mock).mockClear();
    (GoogleSignin.signOut as jest.Mock).mockClear();
    (Auth.signOut as jest.Mock).mockClear();
  });

  const doRender = (statesSpy: jest.Mock) => {
    function App () {
      const [doSignOut, state] = useGoogleSignOut();

      statesSpy(state);

      React.useEffect(() => {
        doSignOut();
      }, [doSignOut]);

      return null;
    }

    render(
      <SocialAuthProvider>
        <App />
      </SocialAuthProvider>
    );
  };

  it('should dispatch a successful sign out', async () => {
    (GoogleSignin.revokeAccess as jest.Mock)
      .mockImplementation(() => Promise.resolve());
    (GoogleSignin.signOut as jest.Mock)
      .mockImplementation(() => Promise.resolve());

    (Auth.signOut as jest.Mock)
      .mockImplementation(() => Promise.resolve());

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.signOut).toBeCalledTimes(1);

    expect(Auth.signOut).toBeCalledTimes(1);
    expect(Auth.signOut).toBeCalledWith({
      global: true
    });

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: true
    });

    expect(statesSpy).toHaveBeenNthCalledWith(3, {
      error: undefined,
      loading: false,
      user: undefined
    });
  });

  it('should dispatch a failed sign out', async () => {
    (GoogleSignin.revokeAccess as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.revokeAccess).toBeCalledTimes(1);

    expect(Auth.signOut).not.toBeCalled();

    expect(statesSpy).toBeCalledTimes(3);

    expect(statesSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: true
    });

    expect(statesSpy).toHaveBeenNthCalledWith(3, {
      error: new Error('oops!'),
      loading: false
    });
  });
});
