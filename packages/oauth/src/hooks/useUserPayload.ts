import { useUser } from '@ivyhjk/amplify-react-core-auth';

import { UserPayload } from '../types';

type User = {
  signInUserSession: {
    idToken: {
      payload: UserPayload
    }
  }
}

export default function useUserPayload (): UserPayload | undefined {
  const user = useUser<User>();

  return user?.signInUserSession.idToken.payload;
}
