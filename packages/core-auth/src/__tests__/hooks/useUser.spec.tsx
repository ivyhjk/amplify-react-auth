import { render } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import useUser from '../../hooks/useUser';
import MockedCoreAuthProvider from '../../tests/MockedCoreAuthProvider';

jest.mock('aws-amplify');

describe('core-auth.hooks.useUser', () => {
  jest.useFakeTimers();

  (Auth.currentAuthenticatedUser as jest.Mock)
    .mockImplementation(() => Promise.resolve({ foo: 'bar' }));

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function App () {
      const state = useUser();

      statesSpy(state);

      return null;
    }

    const user = {
      foo: 'bar'
    };

    render(
      <MockedCoreAuthProvider user={user}>
        <App />
      </MockedCoreAuthProvider>
    );

    expect(statesSpy).toBeCalledWith({
      foo: 'bar'
    });
  });
});
