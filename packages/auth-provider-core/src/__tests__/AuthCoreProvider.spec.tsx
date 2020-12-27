import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthCoreContext } from '../AuthCoreContext';
import AuthCoreProvider from '../AuthCoreProvider';

jest.mock('aws-amplify');

describe('auth-provider-core.AuthCoreProvider', () => {
  jest.useFakeTimers();

  beforeEach(async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockClear();
  });

  it('should render children components', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    const rendered = render(
      <AuthCoreProvider>
        <div className="unique">Test</div>
      </AuthCoreProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should update props when the state changes', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    const contextSpy = jest.fn();

    const TestChild = () => {
      const {
        error,
        loading,
        user
      } = React.useContext(getAuthCoreContext());

      contextSpy({
        error,
        loading,
        user
      });

      return null;
    };

    render(
      <AuthCoreProvider>
        <TestChild />
      </AuthCoreProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(Auth.currentAuthenticatedUser).toBeCalledTimes(1);

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
