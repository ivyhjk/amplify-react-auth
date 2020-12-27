import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthCoreContext } from './AuthCoreContext';
import { AuthCoreContextValue } from './types';

const defaultState: Omit<AuthCoreContextValue, 'dispatch'> = {
  loading: false
};

const AuthCoreProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(defaultState);
  const AuthCoreContext = getAuthCoreContext();

  React.useEffect(() => {
    setState({
      error: undefined,
      loading: true,
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
    <AuthCoreContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        user: state.user,
        dispatch: setState
      }}
    >
      {children}
    </AuthCoreContext.Provider>
  );
};

export default AuthCoreProvider;
