import React from 'react';

import { SocialAuthContextValue } from './types';

// To make sure SocialAuth doesn't create more than one React context
// (which can lead to problems like having a SocialAuth instance added
// in one context, then attempting to retrieve it from another different
// context), a single SocialAuth context is created and tracked in global state.
// Since the created context is React specific, we've decided to attach it to
// the `React` object for sharing.

// If Symbol's aren't available, we'll use a fallback string as the context
// property (we're looking at you, IE11).
const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__SOCIAL_AUTH_CONTEXT__')
  : '__SOCIAL_AUTH_CONTEXT__';

export function resetSocialAuthContext (): void {
  Object.defineProperty(React, contextSymbol, {
    configurable: true,
    enumerable: false,
    value: React.createContext<SocialAuthContextValue>({
      error: undefined,
      googleSignIn: () => { /* default empty function */ },
      googleSignOut: () => { /* default empty function */ },
      loading: false,
      user: undefined
    }),
    writable: false
  });
}

export function getSocialAuthContext (): React.Context<SocialAuthContextValue> {
  if (!(React as Record<string, unknown>)[contextSymbol as string]) {
    resetSocialAuthContext();
  }

  return (
    React as Record<string, unknown>
  )[contextSymbol as string] as React.Context<SocialAuthContextValue>;
}
