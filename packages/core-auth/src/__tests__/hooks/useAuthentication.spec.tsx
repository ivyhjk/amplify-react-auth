import { render } from '@testing-library/react';
import React from 'react';

import useAuthentication from '../../hooks/useAuthentication';
import MockedCoreAuthProvider from '../../tests/MockedCoreAuthProvider';

describe('core-auth.hooks.useAuthentication', () => {
  jest.useFakeTimers();

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function App () {
      const state = useAuthentication();

      statesSpy(state);

      return null;
    }

    const user = {
      foo: 'bar'
    };

    render(
      <MockedCoreAuthProvider user={user} loading={false} error={undefined}>
        <App />
      </MockedCoreAuthProvider>
    );

    expect(statesSpy).toBeCalledWith({
      loading: false,
      user,
      error: undefined
    });
  });
});
