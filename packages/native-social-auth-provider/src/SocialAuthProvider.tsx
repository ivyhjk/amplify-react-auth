import {
  AuthCoreProvider,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { getSocialAuthContext } from './SocialAuthContext';
import googleSignIn from './utils/googleSignIn';
import googleSignOut from './utils/googleSignOut';

const SocialAuthProvider: React.FC = ({ children }) => {
  const AuthCoreContext = getAuthCoreContext();
  const SocialAuthContext = getSocialAuthContext();

  return (
    <AuthCoreProvider>
      <AuthCoreContext.Consumer>
        {({ loading, error, user, dispatch }) => (
          <SocialAuthContext.Provider
            value={{
              error,
              loading,
              googleSignIn: googleSignIn(dispatch),
              googleSignOut: googleSignOut(dispatch),
              user
            }}
          >
            {children}
          </SocialAuthContext.Provider>
        )}
      </AuthCoreContext.Consumer>
    </AuthCoreProvider>
  );
};

export default SocialAuthProvider;
