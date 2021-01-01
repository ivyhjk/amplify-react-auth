import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { Auth } from 'aws-amplify';
import React from 'react';

import { AuthContextValue, AuthUser } from '../types';

type UseSignOutState = [
  AuthContextValue['signOut'],
  BaseCoreAuthContextValue<AuthUser>
];

export default function useSignOut (): UseSignOutState {
  const { error, loading, user, dispatch } = React.useContext(getCoreAuthContext());

  const doSignOut = React.useCallback(() => {
    dispatch({
      error: undefined,
      loading: true,
      user: undefined
    });

    Auth.signOut({
      global: true
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
    doSignOut,
    {
      error,
      loading,
      user
    }
  ];
}
