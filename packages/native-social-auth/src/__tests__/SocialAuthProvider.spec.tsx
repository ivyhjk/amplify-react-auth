import { render, waitFor } from '@testing-library/react-native';
import { Auth } from 'aws-amplify';
import React from 'react';
import { Text, View } from 'react-native';

import {
  getSocialAuthContext,
  resetSocialAuthContext
} from '../SocialAuthContext';
import SocialAuthProvider from '../SocialAuthProvider';
import flushPromises from './flushPromises';

jest.mock('@aws-amplify/auth');

describe('native-social-auth-provider.SocialAuthProvider', () => {
  beforeEach(async () => {
    resetSocialAuthContext();
  });

  (Auth.currentAuthenticatedUser as jest.Mock)
    .mockImplementation(() => Promise.resolve({
      email: 'foo@bar.baz'
    }));

  it('should render children components', async () => {
    const rendered = render(
      <SocialAuthProvider>
        <View>
          <Text>
            Test
          </Text>
        </View>
      </SocialAuthProvider>
    );

    await waitFor(flushPromises);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const TestChild = () => {
      const {
        googleSignIn,
        googleSignOut
      } = React.useContext(getSocialAuthContext());

      expect(googleSignIn).toBeTruthy();
      expect(googleSignOut).toBeTruthy();

      return (
        <View>
          <Text>
            Test
          </Text>
        </View>
      );
    };

    render(
      <SocialAuthProvider>
        <TestChild />
      </SocialAuthProvider>
    );

    await waitFor(flushPromises);

    expect.hasAssertions();
  });
});
