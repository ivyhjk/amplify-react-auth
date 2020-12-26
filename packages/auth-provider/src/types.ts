import { AuthState } from '@ivyhjk/amplify-react-auth-provider-core';

export interface AuthContextValue extends AuthState {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
