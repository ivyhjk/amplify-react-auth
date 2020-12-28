import { AuthContextFunction } from '@ivyhjk/amplify-react-core-auth-provider';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin';

import federatedSignIn from './federatedSignIn';

const googleSignIn: AuthContextFunction = (dispatch) => async () => {
  dispatch({
    error: undefined,
    loading: true,
    user: undefined
  });

  try {
    await GoogleSignin.hasPlayServices();

    try {
      const userInfo = await GoogleSignin.signIn();

      const user = await federatedSignIn(
        'google',
        userInfo.idToken as string,
        {
          ...userInfo.user,
          name: userInfo.user.name || 'unknown'
        }
      );

      dispatch({
        loading: false,
        user
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch({
          loading: false
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    dispatch({
      error,
      loading: false
    });
  }
};

export default googleSignIn;
