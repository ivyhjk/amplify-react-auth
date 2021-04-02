import React from 'react';

import { getCoreAuthContext } from './CoreAuthContext';
import { useCurrentAuthenticatedUser } from './hooks';
import { BaseCoreAuthContextValue } from './types';

interface CoreAuthProviderProps {
  children: React.ReactNode
}

export default function CoreAuthProvider<TUser> ({
  children
}: CoreAuthProviderProps): React.ReactElement<CoreAuthProviderProps> {
  const authenticatedUserState = useCurrentAuthenticatedUser<TUser>();
  const [state, setState] = React.useState<BaseCoreAuthContextValue<TUser>>();
  const CoreAuthContext = getCoreAuthContext<TUser>();

  return (
    <CoreAuthContext.Provider
      value={{
        dispatch: setState as React.Dispatch<React.SetStateAction<BaseCoreAuthContextValue<TUser>>>,
        error: state ? state.error : authenticatedUserState.error,
        loading: state ? state.loading : authenticatedUserState.loading,
        user: state ? state.user : authenticatedUserState.user
      }}
    >
      {children}
    </CoreAuthContext.Provider>
  );
}
