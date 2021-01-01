import React from 'react';

import { CoreAuthContextValue } from './types';

// To make sure AuthCore doesn't create more than one React context
// (which can lead to problems like having an AuthCore instance added
// in one context, then attempting to retrieve it from another different
// context), a single AuthCore context is created and tracked in global state.
// Since the created context is React specific, we've decided to attach it to
// the `React` object for sharing.

// If Symbol's aren't available, we'll use a fallback string as the context
// property (we're looking at you, IE11).
const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__CORE_AUTH_CONTEXT__')
  : '__CORE_AUTH_CONTEXT__';

export function resetCoreAuthContext<TUser> (): void {
  Object.defineProperty(React, contextSymbol, {
    configurable: true,
    enumerable: false,
    value: React.createContext<CoreAuthContextValue<TUser>>({
      error: undefined,
      loading: false,
      user: undefined,
      dispatch: () => { /* ... */ }
    }),
    writable: false
  });
}

export function getCoreAuthContext<TUser> (

): React.Context<CoreAuthContextValue<TUser>> {
  if (!(React as Record<string, unknown>)[contextSymbol as string]) {
    resetCoreAuthContext();
  }

  return (
    React as Record<string, unknown>
  )[contextSymbol as string] as React.Context<CoreAuthContextValue<TUser>>;
}
