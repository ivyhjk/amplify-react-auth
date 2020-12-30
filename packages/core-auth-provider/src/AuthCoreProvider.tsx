import React from 'react';

import { getAuthCoreContext } from './AuthCoreContext';
import { BaseAuthCoreContextValue } from './types';

const defaultState: BaseAuthCoreContextValue = {
  loading: false
};

const AuthCoreProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(defaultState);
  const AuthCoreContext = getAuthCoreContext();

  return (
    <AuthCoreContext.Provider
      value={{
        dispatch: setState,
        error: state.error,
        loading: state.loading,
        user: state.user
      }}
    >
      {children}
    </AuthCoreContext.Provider>
  );
};

export default AuthCoreProvider;
