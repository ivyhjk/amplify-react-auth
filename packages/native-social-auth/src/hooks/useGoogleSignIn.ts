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

type UseSignInTuple<TUser extends FederatedUser> = [
  SocialAuthContextValue['googleSignIn'],
  BaseCoreAuthContextValue<TUser>
];

export default function useGoogleSignIn <TUser extends FederatedUser = FederatedUser> (

): UseSignInTuple<TUser> {
  const { error, loading, user, dispatch } = React.useContext(getCoreAuthContext<TUser>());

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

        const user = await federatedSignIn<TUser>(
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
        if ((error as { code: string }).code === statusCodes.SIGN_IN_CANCELLED) {
          dispatch({
            loading: false
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      dispatch({
        error: error as Error,
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
