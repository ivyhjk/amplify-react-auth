import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {
  BaseCoreAuthContextValue
} from '@ivyhjk/amplify-react-core-auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type OAuthUser = CognitoUser;

export interface OAuthContextValue extends BaseCoreAuthContextValue<OAuthUser> {
  federatedSignIn: (provider: CognitoHostedUIIdentityProvider) => void;
  signOut: () => void;
}
