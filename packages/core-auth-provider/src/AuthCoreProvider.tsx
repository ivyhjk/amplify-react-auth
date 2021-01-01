import React from 'react';

import { getAuthCoreContext } from './AuthCoreContext';
import { BaseAuthCoreContextValue } from './types';

const defaultState = {
  loading: false
};

interface AuthCoreProviderProps {
  children: React.ReactNode
}

export default function AuthCoreProvider<TUser> ({
  children
}: AuthCoreProviderProps): React.ReactElement<AuthCoreProviderProps> {
  const [state, setState] = React.useState<BaseAuthCoreContextValue<TUser>>(defaultState);
  const AuthCoreContext = getAuthCoreContext<TUser>();

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
}
