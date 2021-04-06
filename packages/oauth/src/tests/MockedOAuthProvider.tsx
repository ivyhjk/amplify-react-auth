import MockedCoreAuthProvider, {
  MockedCoreAuthProviderProps
} from '@ivyhjk/amplify-react-core-auth/src/tests/MockedCoreAuthProvider';
import React from 'react';

import { OAuthContextProvider } from '../OAuthProvider';

export default function MockedOAuthProvider<TUser> (
  { children, ...rest }: MockedCoreAuthProviderProps<TUser>
): React.ReactElement<MockedCoreAuthProviderProps<TUser>> {
  return (
    <MockedCoreAuthProvider {...rest}>
      <OAuthContextProvider>
        {children}
      </OAuthContextProvider>
    </MockedCoreAuthProvider>
  );
}
