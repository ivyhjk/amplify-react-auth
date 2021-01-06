import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {
  BaseCoreAuthContextValue,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { Auth } from 'aws-amplify';
import React from 'react';

import { OAuthContextValue, OAuthUser } from '../types';

type UseFederatedSignInTuple = [
  OAuthContextValue['federatedSignIn'],
  BaseCoreAuthContextValue<OAuthUser>
];

export default function useFederatedSignIn (): UseFederatedSignInTuple {
  const {
    dispatch,
    error,
    loading,
    user
  } = React.useContext(getCoreAuthContext<OAuthUser>());

  const doSignIn = React.useCallback((
    provider: CognitoHostedUIIdentityProvider
  ) => {
    dispatch({
      error: undefined,
      loading: true,
      user: undefined
    });

    Auth.federatedSignIn({ provider });
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
