import { CoreAuthContextValue } from '@ivyhjk/amplify-react-core-auth';
import { FederatedUser } from '@ivyhjk/amplify-react-federated-auth';

export interface SocialAuthContextValue<TUser extends FederatedUser = FederatedUser> extends
  Omit<CoreAuthContextValue<TUser>, 'dispatch'> {
  googleSignIn: () => void;
  googleSignOut: () => void;
}

export interface GoogleUser extends FederatedUser {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
  token: string;
}
