import { HubCallback } from '@aws-amplify/core';
import {
  CoreAuthProvider,
  getCoreAuthContext
} from '@ivyhjk/amplify-react-core-auth';
import { Auth, Hub } from 'aws-amplify';
import React from 'react';

import { useFederatedSignIn, useSignOut } from './hooks';
import { getOAuthContext } from './OAuthContext';
import { OAuthUser } from './types';

interface SocialAuthProviderProps {
  children: React.ReactNode
}

function OAuthContextProvider ({
  children
}: SocialAuthProviderProps): React.ReactElement<SocialAuthProviderProps> {
  const OAuthContext = getOAuthContext();
  const [federatedSignIn] = useFederatedSignIn();
  const [signOut] = useSignOut();
  const {
    dispatch,
    error,
    loading,
    user
  } = React.useContext(getCoreAuthContext<OAuthUser>());

  React.useEffect(() => {
    const listener: HubCallback = ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          Auth.currentAuthenticatedUser()
            .then(user => dispatch({
              loading: false,
              user
            }))
            .catch(error => dispatch({
              error,
              loading: false
            }));
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          dispatch({
            error: data,
            loading: false
          });
          break;
      }
    };

    Hub.listen('auth', listener);

    return () => {
      Hub.remove('auth', listener);
    };
  }, [dispatch]);

  return (
    <OAuthContext.Provider
      value={{
        error,
        loading,
        federatedSignIn,
        signOut,
        user
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
}

export default function OAuthProvider ({
  children
}: SocialAuthProviderProps): React.ReactElement<SocialAuthProviderProps> {
  return (
    <CoreAuthProvider>
      <OAuthContextProvider>
        {children}
      </OAuthContextProvider>
    </CoreAuthProvider>
  );
}
