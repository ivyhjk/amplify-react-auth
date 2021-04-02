import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import CoreAuthProvider from '../../CoreAuthProvider';
import useUser from '../../hooks/useUser';

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

    render(
      <CoreAuthProvider>
        <App />
      </CoreAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(statesSpy).toBeCalledTimes(2);

    expect(statesSpy).toHaveBeenNthCalledWith(1, undefined);
    expect(statesSpy).toHaveBeenNthCalledWith(2, {
      foo: 'bar'
    });
  });
});
