import MockedCoreAuthProvider, {
  MockedCoreAuthProviderProps
} from '@ivyhjk/amplify-react-core-auth/src/tests/MockedCoreAuthProvider';
import React from 'react';

import { AuthContextProvider } from '../AuthProvider';

type MockedOAuthProviderProps = React.PropsWithChildren<{
  loading: false
}>;

export default function MockedOAuthProvider<TUser> (
  { children, ...rest }: MockedCoreAuthProviderProps<TUser>
): React.ReactElement<MockedOAuthProviderProps> {
  return (
    <MockedCoreAuthProvider {...rest}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </MockedCoreAuthProvider>
  );
}
