import { waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';

import signIn from '../../utils/signIn';

describe('auth-provider.utils.signIn', () => {
  jest.useFakeTimers();

  it('should dispatch a successful response', async () => {
    (Auth.signIn as jest.Mock).mockImplementation(() => Promise.resolve({
      foo: 'bar'
    }));

    const dispatch = jest.fn();

    const doSignIn = signIn(dispatch);

    doSignIn('foo', 'bar');

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
  });

  it('should dispatch an error response', async () => {
    (Auth.signIn as jest.Mock)
      .mockImplementation(() => Promise.reject(new Error('oops!')));

    const dispatch = jest.fn();

    const doSignIn = signIn(dispatch);

    doSignIn('foo', 'bar');

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
