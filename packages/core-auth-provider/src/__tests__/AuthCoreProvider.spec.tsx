import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { getAuthCoreContext } from '../AuthCoreContext';
import AuthCoreProvider from '../AuthCoreProvider';

describe('core-auth-provider.AuthCoreProvider', () => {
  jest.useFakeTimers();

  it('should render children components', async () => {
    const rendered = render(
      <AuthCoreProvider>
        <div className="unique">Test</div>
      </AuthCoreProvider>
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
      } = React.useContext(getAuthCoreContext());

      contextSpy({
        error,
        loading,
        user
      });

      React.useEffect(() => {
        dispatch({
          loading: true
        });
      }, [dispatch]);

      return null;
    };

    render(
      <AuthCoreProvider>
        <TestChild />
      </AuthCoreProvider>
    );

    await waitFor(jest.runOnlyPendingTimers);

    expect(contextSpy).toBeCalledTimes(2);
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
  });
});
