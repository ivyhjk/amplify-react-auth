import React from 'react';

import { getAuthContext } from '../AuthContext';
import { AuthContextValue } from '../types';

type UseSignInState = [
  AuthContextValue['signIn'],
  Omit<AuthContextValue, 'signOut' | 'signIn'>
];

export default function useSignIn (): UseSignInState {
  const { error, loading, signIn, user } = React.useContext(getAuthContext());

  return [
    signIn,
    {
      error,
      loading,
      user
    }
  ];
}
