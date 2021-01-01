import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import {
  federatedSignIn,
  FederatedUser
} from '@ivyhjk/amplify-react-federated-auth';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin';
import React from 'react';

import { SocialAuthContextValue } from '../types';

type UseSignInTuple = [
  SocialAuthContextValue['googleSignIn'],
  BaseCoreAuthContextValue<FederatedUser>
];

export default function useGoogleSignIn (): UseSignInTuple {
  const { error, loading, user, dispatch } = React.useContext(getCoreAuthContext());

  const googleSignIn = React.useCallback(async () => {
    dispatch({
      error: undefined,
      loading: true,
      user: undefined
    });

    try {
      await GoogleSignin.hasPlayServices();

      try {
        const userInfo = await GoogleSignin.signIn();

        const user = await federatedSignIn(
          'google',
          userInfo.idToken as string,
          {
            ...userInfo.user,
            name: userInfo.user.name || 'unknown'
          }
        );

        dispatch({
          loading: false,
          user
        });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          dispatch({
            loading: false
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      dispatch({
        error,
        loading: false
      });
    }
  }, [dispatch]);

  return [
    googleSignIn,
    {
      error,
      loading,
      user
    }
  ];
}
