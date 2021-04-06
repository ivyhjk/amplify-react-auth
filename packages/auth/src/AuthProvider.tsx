import {
  CoreAuthProvider,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { useSignIn, useSignOut } from './hooks';
import { AuthUser } from './types';

export const AuthContextProvider: React.FC = ({ children }) => {
  const AuthContext = getAuthContext();
  const CoreAuthContext = getCoreAuthContext<AuthUser>();
  const [signIn] = useSignIn();
  const [signOut] = useSignOut();

  return (
    <CoreAuthContext.Consumer>
      {({ error, loading, user }) => (
        <AuthContext.Provider
          value={{
            error,
            loading,
            signIn,
            signOut,
            user
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </CoreAuthContext.Consumer>
  );
};

const AuthProvider: React.FC = ({ children }) => {
  return (
    <CoreAuthProvider<AuthUser>>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </CoreAuthProvider>
  );
};

export default AuthProvider;
