import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { FederatedUser } from '@ivyhjk/amplify-react-federated-auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Auth } from 'aws-amplify';
import React from 'react';

import { SocialAuthContextValue } from '../types';

type UseSignOutTuple = [
  SocialAuthContextValue['googleSignOut'],
  BaseCoreAuthContextValue<FederatedUser>
];

export default function useGoogleSignOut<TUser extends FederatedUser = FederatedUser> (

): UseSignOutTuple {
  const { error, loading, user, dispatch } = React.useContext(getCoreAuthContext<TUser>());

  const doSignOut = React.useCallback(async () => {
    dispatch({
      error: undefined,
      loading: true
    });

    try {
      await GoogleSignin.revokeAccess();
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
