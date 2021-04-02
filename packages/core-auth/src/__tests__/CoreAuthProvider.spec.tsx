import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getCoreAuthContext } from '../CoreAuthContext';
import CoreAuthProvider from '../CoreAuthProvider';

jest.mock('aws-amplify');

type TestUser = {
  foo?: string;
  bar?: string;
}

describe('core-auth.CoreAuthProvider', () => {
  jest.useFakeTimers();

  (Auth.currentAuthenticatedUser as jest.Mock)
    .mockImplementation(() => Promise.resolve({
      foo: 'bar'
    }));

  it('should render children components', async () => {
    const rendered = render(
      <CoreAuthProvider>
        <div className="unique">Test</div>
      </CoreAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    const contextSpy = jest.fn();

    const TestChild = () => {
      const {
        dispatch,
        error,
        loading,
        user
      } = React.useContext(getCoreAuthContext<TestUser>());

      contextSpy({
        error,
        loading,
        user
      });

      React.useEffect(() => {
        if (!loading) {
          dispatch({
            loading: false,
            user: {
              bar: 'baz'
            }
          });
        }
      }, [dispatch, loading]);

      return null;
    };

    render(
      <CoreAuthProvider>
        <TestChild />
      </CoreAuthProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(contextSpy).toBeCalledTimes(3);
    expect(contextSpy).toHaveBeenNthCalledWith(1, {
      error: undefined,
      loading: true,
      user: undefined
    });
    expect(contextSpy).toHaveBeenNthCalledWith(2, {
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });
    expect(contextSpy).toHaveBeenNthCalledWith(3, {
      error: undefined,
      loading: false,
      user: {
        bar: 'baz'
      }
    });
  });
});
