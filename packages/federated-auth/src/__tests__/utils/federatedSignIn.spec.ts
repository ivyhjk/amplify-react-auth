import { Auth } from 'aws-amplify';

import federatedSignIn from '../../utils/federatedSignIn';

jest.mock('aws-amplify');

describe('federated-auth.utils.federatedSignIn', () => {
  beforeEach(async () => {
    (Auth.federatedSignIn as jest.Mock).mockClear();
    (Auth.currentAuthenticatedUser as jest.Mock).mockClear();
  });

  it('sign in successfully', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        foo: 'bar'
      }));

    const response = await federatedSignIn(
      'google',
      'theToken',
      {
        name: 'The Name',
        email: 'the@mail.com'
      }
    );

    // the value from __mocks__ folder.
    expect(response).toStrictEqual({
      foo: 'bar'
    });

    expect(Auth.federatedSignIn).toBeCalledTimes(1);
    expect(Auth.federatedSignIn).toBeCalledWith(
      'google',
      expect.objectContaining({
        token: 'theToken'
      }),
      {
        name: 'The Name',
        email: 'the@mail.com'
      }
    );

    expect(Auth.currentAuthenticatedUser).toBeCalledTimes(1);
    expect(Auth.currentAuthenticatedUser).toBeCalledWith({
      bypassCache: true
    });
  });
});
