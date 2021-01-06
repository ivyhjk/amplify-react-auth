import {
  getCachedContext,
  resetCachedContext
} from '@ivyhjk/amplify-react-core-auth';
import React from 'react';

import { AuthContextValue } from './types';

const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__AUTH_CONTEXT__')
  : '__AUTH_CONTEXT__';

const defaultContextValue: AuthContextValue = {
  error: undefined,
  loading: false,
  signIn: () => { /* default empty function */ },
  signOut: () => { /* default empty function */ },
  user: undefined
};

export function resetAuthContext (): void {
  resetCachedContext<AuthContextValue>(
    contextSymbol,
    defaultContextValue
  );
}

export function getAuthContext (): React.Context<AuthContextValue> {
  return getCachedContext<AuthContextValue>(
    contextSymbol,
    defaultContextValue
  );
}
