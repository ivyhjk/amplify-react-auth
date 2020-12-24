import React from 'react';

import { AuthContextValue, getAuthContext } from './AuthContext';

export interface AuthConsumerProps {
  children: (
    signIn: AuthContextValue['signIn'],
    signOut: AuthContextValue['signOut'],
    loading: AuthContextValue['loading'],
    error: AuthContextValue['error'],
    user: AuthContextValue['user'],
  ) => React.ReactChild | null;
}

type PartialAuthContextValue = Partial<Omit<AuthContextValue, 'loading'>> & {
  loading: AuthContextValue['loading'];
};

export const AuthConsumer: React.FC<AuthConsumerProps> = (props) => {
  const AuthContext = getAuthContext();

  return (
    <AuthContext.Consumer>
      {(context: PartialAuthContextValue) => {
        if (
          !context ||
          !context.signIn ||
          !context.signOut
        ) {
          throw new Error(
            'Could not find "signIn" or "signOut" in the context of AuthConsumer. ' +
            'Wrap the root component in a <AuthProvider>.'
          );
        }

        return props.children(
          context.signIn,
          context.signOut,
          context.loading,
          context.error,
          context.user
        );
      }}
    </AuthContext.Consumer>
  );
};

export default AuthConsumer;
