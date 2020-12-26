import { AuthContextFunction } from '@ivyhjk/amplify-react-auth-provider-core';
import { Auth } from 'aws-amplify';

const signOut: AuthContextFunction = (dispatch) => () => {
  dispatch({
    error: undefined,
    loading: true
  });

  Auth.signOut({
    global: true
  })
    .then(() => dispatch({
      user: undefined,
      loading: false
    }))
    .catch((error) => dispatch({
      error,
      loading: false
    }));
};

export default signOut;
