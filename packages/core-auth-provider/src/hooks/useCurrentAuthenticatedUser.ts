import { Auth } from 'aws-amplify';
import React from 'react';

import { getAuthCoreContext } from '../AuthCoreContext';
import { BaseAuthCoreContextValue } from '../types';

export default function useCurrentAuthenticatedUser (

): BaseAuthCoreContextValue {
  const {
    error,
    loading,
    user,
    dispatch
  } = React.useContext(getAuthCoreContext());

  React.useEffect(() => {
    dispatch({
      error: undefined,
      loading: true,
      user: undefined
    });

    Auth.currentAuthenticatedUser({
      bypassCache: true
    })
      .then((data) => dispatch({
        loading: false,
        user: data
      }))
      .catch((error) => dispatch({
        error,
        loading: false
      }));
  }, [dispatch]);

  return { error, loading, user };
}
