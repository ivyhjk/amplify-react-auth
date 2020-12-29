import {
  GoogleSignin
} from '@react-native-community/google-signin';
import { Auth } from 'aws-amplify';

import googleSignOut from '../../utils/googleSignOut';

describe('social-auth-provider.utils.googleSignOut', () => {
  beforeEach(async () => {
    (GoogleSignin.signOut as jest.Mock).mockClear();
    (Auth.signOut as jest.Mock).mockClear();
  });

  it('should dispatch a successful sign out', async () => {
    const dispatch = jest.fn();

    (GoogleSignin.signOut as jest.Mock)
      .mockImplementation(() => Promise.resolve());

    (Auth.signOut as jest.Mock)
      .mockImplementation(() => Promise.resolve());

    const doGoogleSignOut = googleSignOut(dispatch);

    await doGoogleSignOut();

    expect(GoogleSignin.signOut).toBeCalledTimes(1);

    expect(Auth.signOut).toBeCalledTimes(1);
    expect(Auth.signOut).toBeCalledWith({
      global: true
    });

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true
    });

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });
  });

  it('should dispatch a failed sign out', async () => {
    const dispatch = jest.fn();

    (GoogleSignin.signOut as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const doGoogleSignOut = googleSignOut(dispatch);

    await doGoogleSignOut();

    expect(GoogleSignin.signOut).toBeCalledTimes(1);

    expect(Auth.signOut).not.toBeCalled();

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true
    });

    expect(dispatch).toBeCalledWith({
      error: new Error('oops!'),
      loading: false
    });
  });
});
