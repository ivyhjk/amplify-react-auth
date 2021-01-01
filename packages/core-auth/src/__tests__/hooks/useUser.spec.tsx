import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { getCoreAuthContext } from '../../CoreAuthContext';
import CoreAuthProvider from '../../CoreAuthProvider';
import useUser from '../../hooks/useUser';

type CustomUser = {
  foo: string;
}

describe('core-auth.hooks.useUser', () => {
  jest.useFakeTimers();

  it('should return a valid state from the context if available', async () => {
    const statesSpy = jest.fn();

    function SetUser () {
      const { dispatch } = React.useContext(getCoreAuthContext<CustomUser>());

      React.useEffect(() => {
        dispatch({
          loading: false,
          user: {
            foo: 'bar'
          }
        });
      }, [dispatch]);

      return null;
    }

    function App () {
      const state = useUser();

      statesSpy(state);

      return null;
    }

    render(
      <CoreAuthProvider>
        <SetUser />
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
