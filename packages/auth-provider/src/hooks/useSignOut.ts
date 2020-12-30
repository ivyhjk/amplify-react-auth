import {
  BaseAuthCoreContextValue,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import { Auth } from 'aws-amplify';
import React from 'react';

import { AuthContextValue } from '../types';

type UseSignOutState = [
  AuthContextValue['signOut'],
  BaseAuthCoreContextValue
];

export default function useSignOut (): UseSignOutState {
  const { error, loading, user, dispatch } = React.useContext(getAuthCoreContext());

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
