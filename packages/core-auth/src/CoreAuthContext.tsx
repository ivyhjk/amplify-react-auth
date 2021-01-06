import React from 'react';

import { CoreAuthContextValue } from './types';
import { getCachedContext, resetCachedContext } from './utils';

const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__CORE_AUTH_CONTEXT__')
  : '__CORE_AUTH_CONTEXT__';

const defaultContextValue = {
  error: undefined,
  loading: false,
  user: undefined,
  dispatch: () => { /* ... */ }
};

export function resetCoreAuthContext<TUser> (): void {
  resetCachedContext<CoreAuthContextValue<TUser>>(
    contextSymbol,
    defaultContextValue
  );
}

export function getCoreAuthContext<TUser> (

): React.Context<CoreAuthContextValue<TUser>> {
  return getCachedContext<CoreAuthContextValue<TUser>>(
    contextSymbol,
    defaultContextValue
  );
}
