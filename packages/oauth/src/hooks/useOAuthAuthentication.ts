import {
  BaseCoreAuthContextValue,
  useAuthentication
} from '@ivyhjk/amplify-react-core-auth';

import { OAuthUser } from '../types';

export default function useOAuthAuthentication (

): BaseCoreAuthContextValue<OAuthUser> {
  return useAuthentication<OAuthUser>();
}
