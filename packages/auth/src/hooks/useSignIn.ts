import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { Auth } from 'aws-amplify';
import React from 'react';

import { AuthContextValue, AuthUser } from '../types';

type UseSignInState = [
  AuthContextValue['signIn'],
  BaseCoreAuthContextValue<AuthUser>
];

export default function useSignIn (): UseSignInState {
  const { error, loading, user, dispatch } = React.useContext(getCoreAuthContext());

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
