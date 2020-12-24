import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthContext } from './AuthContext';

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface AuthProviderState {
  user?: CognitoUser;
  error?: Error;
  loading: boolean;
}

const defaultState: AuthProviderState = {
  loading: false
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = React.useState(defaultState);

  const AuthContext = getAuthContext();

  const signIn = React.useCallback((username: string, password: string) => {
    setState({
      user: undefined,
      error: undefined,
      loading: true
    });

    Auth.signIn({
      password,
      username
    })
      .then((data) => setState({
        user: data,
        loading: false
      }))
      .catch((error: Error) => setState({
        error,
        loading: false
      }));
  }, []);

  const signOut = React.useCallback(async () => {
    setState({
      error: undefined,
      loading: true,
      user: undefined
    });

    try {
      await Auth.signOut();

      setState({
        loading: false
      });
    } catch (error) {
      setState({
        error,
        loading: false
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      error: state.error,
      loading: state.loading,
      signIn,
      signOut,
      user: state.user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
