import React from 'react';

// To make sure doesn't create more than one React context
// (which can lead to problems like having a context instance added
// in one context, then attempting to retrieve it from another different
// context), a single context is created and tracked in global state.
// Since the created context is React specific, we've decided to attach it to
// the `React` object for sharing.

// If Symbol's aren't available, you should use a fallback string as the context
// property (we're looking at you, IE11).
export default function resetCachedContext<TContextValue> (
  contextSymbol: symbol | string,
  defaultValue: TContextValue
): void {
  Object.defineProperty(React, contextSymbol, {
    configurable: true,
    enumerable: false,
    value: React.createContext<TContextValue>({
      ...defaultValue
    }),
    writable: false
  });
}
