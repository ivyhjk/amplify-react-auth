import { AuthCoreContextValue } from '@ivyhjk/amplify-react-core-auth-provider';

export interface SocialAuthContextValue extends Omit<AuthCoreContextValue, 'dispatch'> {
  googleSignIn: () => void;
  googleSignOut: () => void;
}
