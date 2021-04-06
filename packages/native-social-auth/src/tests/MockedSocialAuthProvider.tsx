import MockedCoreAuthProvider, {
  MockedCoreAuthProviderProps
} from '@ivyhjk/amplify-react-core-auth/src/tests/MockedCoreAuthProvider';
import React from 'react';

import { SocialAuthContextProvider } from '../SocialAuthProvider';

export default function MockedSocialAuthProvider<TUser> (
  { children, ...rest }: MockedCoreAuthProviderProps<TUser>
): React.ReactElement<MockedCoreAuthProviderProps<TUser>> {
  return (
    <MockedCoreAuthProvider {...rest}>
      <SocialAuthContextProvider>
        {children}
      </SocialAuthContextProvider>
    </MockedCoreAuthProvider>
  );
}
