import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

import {
  getSocialAuthContext,
  resetSocialAuthContext
} from '../SocialAuthContext';
import SocialAuthProvider from '../SocialAuthProvider';
import flushPromises from './flushPromises';

describe('native-social-auth-provider.SocialAuthProvider', () => {
  beforeEach(async () => {
    resetSocialAuthContext();
  });

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
    const contextSpy = jest.fn();

    const TestChild = () => {
      const {
        error,
        googleSignIn,
        googleSignOut,
        loading,
        user
      } = React.useContext(getSocialAuthContext());

      contextSpy({
        error,
        loading,
        user
      });

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

    expect(contextSpy).toBeCalledTimes(3);

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: undefined
    });

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(contextSpy).toBeCalledWith({
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
  });
});
