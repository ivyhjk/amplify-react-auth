import React from 'react';

import { getCoreAuthContext } from '../CoreAuthContext';
import { CoreAuthContextValue } from '../types';

export type MockedCoreAuthProviderProps<TUser> = React.PropsWithChildren<Partial<CoreAuthContextValue<TUser>>>;

export default function MockedCoreAuthProvider<TUser> ({
  dispatch = jest.fn(),
  loading = false,
  error,
  user,
  children
}: MockedCoreAuthProviderProps<TUser>): React.ReactElement<MockedCoreAuthProviderProps<TUser>> {
  const CoreAuthContext = getCoreAuthContext<TUser>();

  return (
    <CoreAuthContext.Provider value={{ loading, error, user, dispatch }}>
      {children}
    </CoreAuthContext.Provider>
  );
}
