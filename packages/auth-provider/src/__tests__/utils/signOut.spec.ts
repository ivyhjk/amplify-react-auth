import { waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';

import signOut from '../../utils/signOut';

describe('auth-provider.utils.signOut', () => {
  jest.useFakeTimers();

  it('should dispatch a successful response', async () => {
    (Auth.signOut as jest.Mock).mockImplementation(() => Promise.resolve());

    const dispatch = jest.fn();

    const doSignOut = signOut(dispatch);

    doSignOut();

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
      user: undefined
    });
  });

  it('should dispatch an error response', async () => {
    (Auth.signOut as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const dispatch = jest.fn();

    const doSignOut = signOut(dispatch);

    doSignOut();

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
