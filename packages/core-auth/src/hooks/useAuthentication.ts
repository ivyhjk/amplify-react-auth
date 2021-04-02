import React from 'react';

import { getCoreAuthContext } from '../CoreAuthContext';
import { BaseCoreAuthContextValue } from '../types';

export default function useAuthentication<TUser> (): BaseCoreAuthContextValue<TUser> {
  const { error, loading, user } = React.useContext(getCoreAuthContext<TUser>());

  return { error, loading, user };
}
