import {
  GoogleSignin,
  statusCodes,
  User
} from '@react-native-community/google-signin';
import { waitFor } from '@testing-library/react-native';
import { CognitoUser } from 'amazon-cognito-identity-js';

import federatedSignIn from '../../utils/federatedSignIn';
import googleSignIn from '../../utils/googleSignIn';
import flushPromises from '../flushPromises';

jest.mock('@react-native-community/google-signin');
jest.mock('../../utils/federatedSignIn');

describe('social-auth-provider.utils.googleSignIn', () => {
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

  beforeEach(async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockClear();
    (GoogleSignin.signIn as jest.Mock).mockClear();
    (federatedSignIn as jest.Mock).mockClear();
  });

  it('should dispatch a successful response', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock)
      .mockImplementation(() => Promise.resolve(true));

    (GoogleSignin.signIn as jest.Mock)
      .mockImplementation(() => Promise.resolve(googleUser));

    (federatedSignIn as jest.Mock)
      .mockImplementation(() => Promise.resolve(cognitoUser));

    const dispatch = jest.fn();

    const doGoogleSignIn = googleSignIn(dispatch);

    doGoogleSignIn();

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

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
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

    const dispatch = jest.fn();

    const doGoogleSignIn = googleSignIn(dispatch);

    doGoogleSignIn();

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
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

    const dispatch = jest.fn();

    const doGoogleSignIn = googleSignIn(dispatch);

    doGoogleSignIn();

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
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

    const dispatch = jest.fn();

    const doGoogleSignIn = googleSignIn(dispatch);

    doGoogleSignIn();

    await waitFor(flushPromises);

    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
      error,
      loading: false
    });
  });
});
