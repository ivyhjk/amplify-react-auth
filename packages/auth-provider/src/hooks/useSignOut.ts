import React from 'react';

import { getAuthContext } from '../AuthContext';
import { AuthContextValue } from '../types';

type UseSignOutState = Omit<AuthContextValue, 'signIn' | 'signOut'>;

export default function useSignOut (): [AuthContextValue['signOut'], UseSignOutState] {
  const { error, loading, signOut, user } = React.useContext(getAuthContext());

  return [
    signOut,
    {
      error,
      loading,
      user
    }
  ];
}
