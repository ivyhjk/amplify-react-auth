import { FederatedUser, LegacyProvider } from '@aws-amplify/auth/lib-esm/types';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

export default async function federatedSignIn (
  provider: LegacyProvider,
  token: string,
  user: FederatedUser
): Promise<CognitoUser> {
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
