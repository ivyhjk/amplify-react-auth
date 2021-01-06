import React from 'react';

import resetCachedContext from './resetCachedContext';

export default function getCoreAuthContext<TContextValue> (
  contextSymbol: symbol | string,
  defaultValue: TContextValue
): React.Context<TContextValue> {
  if (!(React as Record<string, unknown>)[contextSymbol as string]) {
    resetCachedContext<TContextValue>(contextSymbol, defaultValue);
  }

  return (
    React as Record<string, unknown>
  )[contextSymbol as string] as React.Context<TContextValue>;
}
