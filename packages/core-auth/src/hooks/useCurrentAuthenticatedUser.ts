import { Auth } from 'aws-amplify';
import React from 'react';

import { BaseCoreAuthContextValue } from '../types';

const defaultState = {
  loading: true
};

export default function useCurrentAuthenticatedUser<TUser> (

): BaseCoreAuthContextValue<TUser> {
  const [state, setState] = React.useState<BaseCoreAuthContextValue<TUser>>(
    defaultState
  );

  React.useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true
    })
      .then((data) => setState({
        loading: false,
        user: data
      }))
      .catch((error) => setState({
        error,
        loading: false
      }));
  }, []);

  return state;
}
