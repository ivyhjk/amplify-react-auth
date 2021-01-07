import { useUser } from '@ivyhjk/amplify-react-core-auth';

import { UserPayload } from '../types';

type User = {
  signInUserSession: {
    idToken: {
      payload: UserPayload
    }
  }
}

export default function useUserPayload (): UserPayload {
  const user = useUser<User>();

  if (!user) {
    throw new Error('failed to get user, please sign in');
  }

  return user.signInUserSession.idToken.payload;
}
