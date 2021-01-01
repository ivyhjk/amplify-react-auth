import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { getCoreAuthContext } from '../CoreAuthContext';
import CoreAuthProvider from '../CoreAuthProvider';

describe('core-auth.CoreAuthProvider', () => {
  jest.useFakeTimers();

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
      } = React.useContext(getCoreAuthContext());

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
      <CoreAuthProvider>
        <TestChild />
      </CoreAuthProvider>
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
