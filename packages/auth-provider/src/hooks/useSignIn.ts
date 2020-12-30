import {
  BaseAuthCoreContextValue,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import { Auth } from 'aws-amplify';
import React from 'react';

import { AuthContextValue } from '../types';

type UseSignInState = [
  AuthContextValue['signIn'],
  BaseAuthCoreContextValue
];

export default function useSignIn (): UseSignInState {
  const { error, loading, user, dispatch } = React.useContext(getAuthCoreContext());

  const doSignIn = React.useCallback((username: string, password: string) => {
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
  }, [dispatch]);

  return [
    doSignIn,
    {
      error,
      loading,
      user
    }
  ];
}
