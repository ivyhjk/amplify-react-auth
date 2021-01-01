import React from 'react';

import { getCoreAuthContext } from '../CoreAuthContext';

export default function useUser<TUser> (): TUser | undefined {
  const { user } = React.useContext(getCoreAuthContext<TUser>());

  return user;
}
