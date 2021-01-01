import React from 'react';

import { getAuthCoreContext } from '../AuthCoreContext';

export default function useUser<TUser> (): TUser | undefined {
  const { user } = React.useContext(getAuthCoreContext<TUser>());

  return user;
}
