import {
  AuthState,
  currentAuthenticatedUser
} from '@ivyhjk/amplify-react-auth-provider-core';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { signIn, signOut } from './utils';

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const defaultState: AuthState = {
  loading: false
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = React.useState(defaultState);
  const AuthContext = getAuthContext();

  React.useEffect(() => {
    const callCurrentAuthenticatedUser = currentAuthenticatedUser(setState);

    callCurrentAuthenticatedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        signIn: signIn(setState),
        signOut: signOut(setState),
        user: state.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
