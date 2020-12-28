import {
  AuthCoreProvider,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { signIn, signOut } from './utils';

const AuthProvider: React.FC = ({ children }) => {
  const AuthContext = getAuthContext();
  const AuthCoreContext = getAuthCoreContext();

  return (
    <AuthCoreProvider>
      <AuthCoreContext.Consumer>
        {({ loading, error, user, dispatch }) => (
          <AuthContext.Provider
            value={{
              error,
              loading,
              signIn: signIn(dispatch),
              signOut: signOut(dispatch),
              user
            }}
          >
            {children}
          </AuthContext.Provider>
        )}
      </AuthCoreContext.Consumer>
    </AuthCoreProvider>
  );
};

export default AuthProvider;
