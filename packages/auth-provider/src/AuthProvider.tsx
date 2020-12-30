import {
  AuthCoreProvider,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { useSignIn, useSignOut } from './hooks';

const AuthContextProvider: React.FC = ({ children }) => {
  const AuthContext = getAuthContext();
  const { error, loading, user } = React.useContext(getAuthCoreContext());
  const [signIn] = useSignIn();
  const [signOut] = useSignOut();

  return (
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
