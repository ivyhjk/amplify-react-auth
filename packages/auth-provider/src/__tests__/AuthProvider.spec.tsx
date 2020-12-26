import {
  currentAuthenticatedUser
} from '@ivyhjk/amplify-react-auth-provider-core';
import { render } from '@testing-library/react';
import React from 'react';

import { getAuthContext } from '../AuthContext';
import AuthProvider from '../AuthProvider';

jest.mock('aws-amplify');

describe('auth-provider.AuthProvider', () => {
  beforeEach(async () => {
    (currentAuthenticatedUser as jest.Mock).mockClear();
  });

  it('should render children components', async () => {
    const rendered = render(
      <AuthProvider>
        <div className="unique">Test</div>
      </AuthProvider>
    );

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const contextSpy = jest.fn();

    const TestChild = () => {
      const {
        error,
        loading,
        signIn,
        signOut,
        user
      } = React.useContext(getAuthContext());

      contextSpy({
        error,
        loading,
        user
      });

      expect(signIn).toBeTruthy();
      expect(signOut).toBeTruthy();

      return null;
    };

    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    );

    expect(currentAuthenticatedUser).toBeCalledTimes(1);
  });
});
