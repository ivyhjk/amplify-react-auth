import {
  getCachedContext,
  resetCachedContext
} from '@ivyhjk/amplify-react-core-auth';
import { FederatedUser } from '@ivyhjk/amplify-react-federated-auth';
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

const defaultContextValue = {
  error: undefined,
  googleSignIn: () => { /* default empty function */ },
  googleSignOut: () => { /* default empty function */ },
  loading: false,
  user: undefined
};

export function resetSocialAuthContext<TUser extends FederatedUser> (): void {
  resetCachedContext<SocialAuthContextValue<TUser>>(
    contextSymbol,
    defaultContextValue
  );
}

export function getSocialAuthContext<TUser extends FederatedUser> (

): React.Context<SocialAuthContextValue<TUser>> {
  return getCachedContext<SocialAuthContextValue<TUser>>(
    contextSymbol,
    defaultContextValue
  );
}
