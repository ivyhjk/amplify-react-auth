import { CoreAuthContextValue } from '@ivyhjk/amplify-react-core-auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthUser = CognitoUser;

export interface AuthContextValue extends
  Omit<CoreAuthContextValue<AuthUser>, 'dispatch'> {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
