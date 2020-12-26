import { CognitoUser } from 'amazon-cognito-identity-js';
import React from 'react';

export interface AuthState {
  error?: Error;
  loading: boolean;
  user?: CognitoUser;
}

export interface AuthContextValue extends AuthState {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

export type AuthContextDispatcher = React.Dispatch<React.SetStateAction<AuthState>>;

export type AuthContextFunction<T extends Array<unknown> = []> = (
  dispatcher: AuthContextDispatcher
) => (...args: T) => void;
