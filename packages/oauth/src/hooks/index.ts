/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  useCurrentAuthenticatedUser,
  useUser
} from '@ivyhjk/amplify-react-core-auth';

import { OAuthUser } from '../types';

export { default as useFederatedSignIn } from './useFederatedSignIn';
export { default as useSignOut } from './useSignOut';
export { default as useUserPayload } from './useUserPayload';

export const useCurrentOAuthAuthenticatedUser = () => useCurrentAuthenticatedUser<OAuthUser>();
export const useOAuthUser = () => useUser<OAuthUser>();
