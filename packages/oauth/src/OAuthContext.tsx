import {
  getCachedContext,
  resetCachedContext
} from '@ivyhjk/amplify-react-core-auth';
import React from 'react';

import { OAuthContextValue } from './types';

const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__OAUTH_CONTEXT__')
  : '__OAUTH_CONTEXT__';

const defaultContextValue: OAuthContextValue = {
  error: undefined,
  federatedSignIn: () => { /* */ },
  loading: false,
  signOut: () => { /* */ },
  user: undefined
};

export function resetOAuthContext (): void {
  resetCachedContext<OAuthContextValue>(
    contextSymbol,
    defaultContextValue
  );
}

export function getOAuthContext (): React.Context<OAuthContextValue> {
  return getCachedContext<OAuthContextValue>(
    contextSymbol,
    defaultContextValue
  );
}
