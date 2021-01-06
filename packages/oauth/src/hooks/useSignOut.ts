import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { Auth } from 'aws-amplify';
import React from 'react';

import { OAuthContextValue, OAuthUser } from '../types';

type UseSignOutTuple = [
  OAuthContextValue['signOut'],
  BaseCoreAuthContextValue<OAuthUser>
];

export default function useSignOut (): UseSignOutTuple {
  const {
    dispatch,
    error,
    loading,
    user
  } = React.useContext(getCoreAuthContext<OAuthUser>());

  const doSignOut = React.useCallback(() => {
    dispatch({
      error: undefined,
      loading: true
    });

    Auth.signOut()
      .then(() => dispatch({
        loading: false,
        user: undefined
      }))
      .catch(error => dispatch({
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
