import React from 'react';

import { getCoreAuthContext } from './CoreAuthContext';
import { BaseCoreAuthContextValue } from './types';

const defaultState = {
  loading: false
};

interface CoreAuthProviderProps {
  children: React.ReactNode
}

export default function CoreAuthProvider<TUser> ({
  children
}: CoreAuthProviderProps): React.ReactElement<CoreAuthProviderProps> {
  const [state, setState] = React.useState<BaseCoreAuthContextValue<TUser>>(
    defaultState
  );
  const CoreAuthContext = getCoreAuthContext<TUser>();

  return (
    <CoreAuthContext.Provider
      value={{
        dispatch: setState,
        error: state.error,
        loading: state.loading,
        user: state.user
      }}
    >
      {children}
    </CoreAuthContext.Provider>
  );
}
