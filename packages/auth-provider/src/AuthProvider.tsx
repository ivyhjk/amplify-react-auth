import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthContext } from './AuthContext';
import { AuthState } from './types';
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
    setState({
      loading: true,
      error: undefined,
      user: undefined
    });

    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(user => setState({
        loading: false,
        user
      }))
      .catch(error => setState({
        loading: false,
        error
      }));
  }, []);

  return (
    <AuthContext.Provider value={{
      error: state.error,
      loading: state.loading,
      signIn: signIn(setState),
      signOut: signOut(setState),
      user: state.user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
