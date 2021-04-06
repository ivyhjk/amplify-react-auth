import {
  CoreAuthProvider,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { FederatedUser } from '@ivyhjk/amplify-react-federated-auth';
import React from 'react';

import { useGoogleSignIn, useGoogleSignOut } from './hooks';
import { getSocialAuthContext } from './SocialAuthContext';

interface SocialAuthProviderProps {
  children: React.ReactNode
}

export function SocialAuthContextProvider<TUser extends FederatedUser> ({
  children
}: SocialAuthProviderProps): React.ReactElement<SocialAuthProviderProps> {
  const SocialAuthContext = getSocialAuthContext<TUser>();
  const CoreAuthContext = getCoreAuthContext<TUser>();
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
}

export default function SocialAuthProvider<TUser extends FederatedUser = FederatedUser> ({
  children
}: SocialAuthProviderProps): React.ReactElement<SocialAuthProviderProps> {
  return (
    <CoreAuthProvider>
      <SocialAuthContextProvider<TUser>>
        {children}
      </SocialAuthContextProvider>
    </CoreAuthProvider>
  );
}
