import {
  AuthCoreProvider,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { useSignIn, useSignOut } from './hooks';

const AuthContextProvider: React.FC = ({ children }) => {
  const AuthContext = getAuthContext();
  const CoreAuthContext = getAuthCoreContext();
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
    <AuthCoreProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </AuthCoreProvider>
  );
};

export default AuthProvider;
