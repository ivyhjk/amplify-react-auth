import { Auth } from 'aws-amplify';

import { AuthContextFunction } from '../types';

const currentAuthenticatedUser: AuthContextFunction = (dispatch) => () => {
  dispatch({
    error: undefined,
    loading: true,
    user: undefined
  });

  Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(user => dispatch({
      loading: false,
      user
    }))
    .catch(error => dispatch({
      loading: false,
      error
    }));
};

export default currentAuthenticatedUser;
