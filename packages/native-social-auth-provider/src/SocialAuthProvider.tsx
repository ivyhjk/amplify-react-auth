import {
  AuthCoreProvider,
  getAuthCoreContext
} from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { useGoogleSignIn, useGoogleSignOut } from './hooks';
import { getSocialAuthContext } from './SocialAuthContext';

const SocialAuthContextProvider: React.FC = ({ children }) => {
  const SocialAuthContext = getSocialAuthContext();
  const CoreAuthContext = getAuthCoreContext();
  const [googleSignIn] = useGoogleSignIn();
  const [googleSignOut] = useGoogleSignOut();

  return (
    <CoreAuthContext.Consumer>
      {({ error, loading, user }) => (
        <SocialAuthContext.Provider
          value={{
            error,
            loading,
            googleSignIn,
            googleSignOut,
            user
          }}
        >
          {children}
        </SocialAuthContext.Provider>
      )}
    </CoreAuthContext.Consumer>
  );
};

const SocialAuthProvider: React.FC = ({ children }) => {
  return (
    <AuthCoreProvider>
      <SocialAuthContextProvider>
        {children}
      </SocialAuthContextProvider>
    </AuthCoreProvider>
  );
};

export default SocialAuthProvider;
