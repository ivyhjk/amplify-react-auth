import { resetAuthCoreContext } from '@ivyhjk/amplify-react-core-auth-provider';
import React from 'react';

import { AuthContextValue } from './types';

// To make sure Auth doesn't create more than one React context
// (which can lead to problems like having an Auth instance added
// in one context, then attempting to retrieve it from another different
// context), a single Auth context is created and tracked in global state.
// Since the created context is React specific, we've decided to attach it to
// the `React` object for sharing.

// If Symbol's aren't available, we'll use a fallback string as the context
// property (we're looking at you, IE11).
const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__AUTH_CONTEXT__')
  : '__AUTH_CONTEXT__';

export function resetAuthContext (): void {
  resetAuthCoreContext();

  Object.defineProperty(React, contextSymbol, {
    configurable: true,
    enumerable: false,
    value: React.createContext<AuthContextValue>({
      error: undefined,
      loading: false,
      signIn: () => { /* default empty function */ },
      signOut: () => { /* default empty function */ },
      user: undefined

    }),
    writable: false
  });
}

export function getAuthContext (): React.Context<AuthContextValue> {
  if (!(React as Record<string, unknown>)[contextSymbol as string]) {
    resetAuthContext();
  }

  return (
    React as Record<string, unknown>
  )[contextSymbol as string] as React.Context<AuthContextValue>;
}
