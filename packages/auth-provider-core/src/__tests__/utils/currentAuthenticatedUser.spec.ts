import { waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';

import currentAuthenticatedUser from '../../utils/currentAuthenticatedUser';

jest.mock('aws-amplify');

describe('auth-provider-core', () => {
  it('should dispatch a successful response', async () => {
    jest.useFakeTimers();

    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    const dispatch = jest.fn();

    const callCurrentAuthenticatedUser = currentAuthenticatedUser(dispatch);

    callCurrentAuthenticatedUser();

    await waitFor(jest.runOnlyPendingTimers);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: false,
      user: {
        foo: 'bar'
      }
    });

    expect(Auth.currentAuthenticatedUser).toBeCalledTimes(1);
    expect(Auth.currentAuthenticatedUser).toBeCalledWith({
      bypassCache: true
    });
  });

  it('should dispatch an error response', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const dispatch = jest.fn();

    const callCurrentAuthenticatedUser = currentAuthenticatedUser(dispatch);

    callCurrentAuthenticatedUser();

    await waitFor(jest.runOnlyPendingTimers);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).toBeCalledWith({
      error: undefined,
      loading: true,
      user: undefined
    });

    expect(dispatch).toBeCalledWith({
      error: new Error('oops!'),
      loading: false,
      user: undefined
    });
  });
});
