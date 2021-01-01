import { FederatedUser, LegacyProvider } from '@aws-amplify/auth/lib-esm/types';
import { Auth } from 'aws-amplify';

export default async function federatedSignIn<TUser extends FederatedUser> (
  provider: LegacyProvider,
  token: string,
  user: FederatedUser
): Promise<TUser> {
  const date = new Date();

  await Auth.federatedSignIn(
    provider,
    {
      token,
      expires_at: 60 * 1000 + date.getTime()
    },
    {
      ...user
    }
  );

  const currenAuthenticatedUser = await Auth.currentAuthenticatedUser({
    bypassCache: true
  });

  return currenAuthenticatedUser;
}
