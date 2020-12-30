import {
  GoogleSignin,
  statusCodes,
  User
} from '@react-native-community/google-signin';
import { render, waitFor } from '@testing-library/react-native';
import { CognitoUser } from 'amazon-cognito-identity-js';
import React from 'react';

import useGoogleSignIn from '../../hooks/useGoogleSignIn';
import { resetSocialAuthContext } from '../../SocialAuthContext';
import SocialAuthProvider from '../../SocialAuthProvider';
import federatedSignIn from '../../utils/federatedSignIn';
import flushPromises from '../flushPromises';

jest.mock('@react-native-community/google-signin');
jest.mock('../../utils/federatedSignIn');

describe('social-auth-provider.hooks.useGoogleSignIn', () => {
  const googleUser: User = {
    idToken: 'theToken',
    serverAuthCode: null,
    user: {
      email: 'foo@bar.baz',
      familyName: 'The Family Name',
      givenName: 'The Given Name',
      id: 'theId',
      name: 'The Name',
      photo: 'The Photo'
    }
  };

  const cognitoUser = {
    foo: 'bar'
  } as unknown as CognitoUser;

  const doRender = (statesSpy: jest.Mock) => {
    function App () {
      const [doSignIn, state] = useGoogleSignIn();

      statesSpy(state);

      React.useEffect(() => {
        doSignIn();
      }, [doSignIn]);

      return null;
    }

    render(
      <SocialAuthProvider>
        <App />
      </SocialAuthProvider>
    );
  };

  beforeEach(async () => {
    resetSocialAuthContext();

    (federatedSignIn as jest.Mock).mockClear();
    (GoogleSignin.hasPlayServices as jest.Mock).mockClear();
    (GoogleSignin.signIn as jest.Mock).mockClear();
  });

  it('should dispatch a successful response', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock)
      .mockImplementation(() => Promise.resolve(true));

    (GoogleSignin.signIn as jest.Mock)
      .mockImplementation(() => Promise.resolve(googleUser));

    (federatedSignIn as jest.Mock)
      .mockImplementation(() => Promise.resolve(cognitoUser));

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);
    expect(GoogleSignin.signIn).toBeCalledTimes(1);

    expect(federatedSignIn).toBeCalledTimes(1);
    expect(federatedSignIn).toBeCalledWith(
      'google',
      'theToken',
      {
        email: 'foo@bar.baz',
        familyName: 'The Family Name',
        givenName: 'The Given Name',
        id: 'theId',
        name: 'The Name',
        photo: 'The Photo'
      }
    );

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
      user: {
        foo: 'bar'
      }
    });
  });

  it('should fails, device has no google play services', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock)
      .mockImplementation(() => Promise.resolve(true));

    (GoogleSignin.signIn as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

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
      loading: false
    });
  });

  it('should not fails, the user cancels the sign in', async () => {
    const error = {
      name: 'oops!',
      message: 'an error!',
      code: statusCodes.SIGN_IN_CANCELLED
    };

    (GoogleSignin.hasPlayServices as jest.Mock)
      .mockImplementation(() => Promise.resolve(true));

    (GoogleSignin.signIn as jest.Mock)
      .mockImplementation(() => Promise.reject(error));

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

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
      loading: false
    });
  });

  it('should fails when try to sign in', async () => {
    const error = {
      name: 'oops!',
      message: 'an error!',
      code: statusCodes.SIGN_IN_REQUIRED
    };

    (GoogleSignin.hasPlayServices as jest.Mock)
      .mockImplementation(() => Promise.resolve(true));

    (GoogleSignin.signIn as jest.Mock)
      .mockImplementation(() => Promise.reject(error));

    const statesSpy = jest.fn();

    doRender(statesSpy);

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

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
      error,
      loading: false
    });
  });
});
