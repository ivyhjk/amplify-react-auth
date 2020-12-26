import { Auth } from 'aws-amplify';

import { AuthContextFunction } from '../types';

const signIn: AuthContextFunction<[string, string]> = (dispatch) => (
  username: string,
  password: string
) => {
  dispatch({
    error: undefined,
    loading: true,
    user: undefined
  });

  Auth.signIn({
    password,
    username
  })
    .then((data) => dispatch({
      loading: false,
      user: data
    }))
    .catch((error) => dispatch({
      error,
      loading: false
    }));
};

export default signIn;
