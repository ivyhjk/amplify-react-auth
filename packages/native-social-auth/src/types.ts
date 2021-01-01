import { CoreAuthContextValue } from '@ivyhjk/amplify-react-core-auth';
import { FederatedUser } from '@ivyhjk/amplify-react-federated-auth';

export interface SocialAuthContextValue<TUser extends FederatedUser = FederatedUser> extends
  Omit<CoreAuthContextValue<TUser>, 'dispatch'> {
  googleSignIn: () => void;
  googleSignOut: () => void;
}
