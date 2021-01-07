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

interface UserPayloadIdentity {
  dateCreated: string;
  issuer: string | null;
  primary: string;
  providerName: string;
  providerType: string;
  userId: string;
}

export interface UserPayload {
  at_ash: string; // eslint-disable-line camelcase
  aud: string;
  auth_time: number; // eslint-disable-line camelcase
  'cognito:groups': Array<string>;
  'cognito:username': string;
  email: string;
  email_verified: boolean; // eslint-disable-line camelcase
  exp: number;
  family_name: string; // eslint-disable-line camelcase
  given_name: string; // eslint-disable-line camelcase
  iat: number;
  identities: Array<UserPayloadIdentity>;
  iss: string;
  name: string;
  nonce: string;
  phone_number_verified: boolean; // eslint-disable-line camelcase
  picture: string;
  sub: string;
  token_use: string; // eslint-disable-line camelcase
}
