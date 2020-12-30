import React from 'react';

import { getSocialAuthContext } from '../SocialAuthContext';
import { SocialAuthContextValue } from '../types';

type UseSignInTuple = [
  SocialAuthContextValue['googleSignIn'],
  Omit<SocialAuthContextValue, 'googleSignIn' | 'googleSignOut'>
];

export default function useGoogleSignIn (): UseSignInTuple {
  const {
    error,
    googleSignIn,
    loading,
    user
  } = React.useContext(getSocialAuthContext());

  return [
    googleSignIn,
    {
      error,
      loading,
      user
    }
  ];
}
