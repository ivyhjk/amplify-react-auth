import React from 'react';

import { getSocialAuthContext } from '../SocialAuthContext';
import { SocialAuthContextValue } from '../types';

type UseSignOutTuple = [
  SocialAuthContextValue['googleSignOut'],
  Omit<SocialAuthContextValue, 'googleSignIn' | 'googleSignOut'>
];

export default function useGoogleSignOut (): UseSignOutTuple {
  const {
    error,
    googleSignOut,
    loading,
    user
  } = React.useContext(getSocialAuthContext());

  return [
    googleSignOut,
    {
      error,
      loading,
      user
    }
  ];
}
