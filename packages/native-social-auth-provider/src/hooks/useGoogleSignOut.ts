import {
  BaseAuthCoreContextValue,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Auth } from 'aws-amplify';
import React from 'react';

import { SocialAuthContextValue } from '../types';

type UseSignOutTuple = [
  SocialAuthContextValue['googleSignOut'],
  BaseAuthCoreContextValue
];

export default function useGoogleSignOut (): UseSignOutTuple {
  const { error, loading, user, dispatch } = React.useContext(getAuthCoreContext());

  const doSignOut = React.useCallback(async () => {
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
