import { AuthContextFunction } from '@ivyhjk/amplify-react-core-auth-provider';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Auth } from 'aws-amplify';

const googleSignOut: AuthContextFunction = (dispatch) => async () => {
  dispatch({
    error: undefined,
    loading: true
  });

  try {
    await GoogleSignin.signOut();

    await Auth.signOut({
      global: true
    });

    dispatch({
      loading: false,
      user: undefined
    });
  } catch (error) {
    dispatch({
      error,
      loading: false
    });
  }
};

export default googleSignOut;
