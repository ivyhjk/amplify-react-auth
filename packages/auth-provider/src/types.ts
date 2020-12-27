import { AuthCoreContextValue } from '@ivyhjk/amplify-react-auth-provider-core';

export interface AuthContextValue extends Omit<AuthCoreContextValue, 'dispatch'> {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
