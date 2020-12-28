import { AuthCoreContextValue } from '@ivyhjk/amplify-react-core-auth-provider';

export interface AuthContextValue extends Omit<AuthCoreContextValue, 'dispatch'> {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
