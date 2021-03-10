# React Amplify OAuth2 authentication wrapper

React OAuth2 authentication wrapper based on top of AWS Amplify

## Install

with NPM:

```bash
npm install @ivyhjk/amplify-react-oauth
```

with yarn:

```bash
yarn add @ivyhjk/amplify-react-oauth
```

## Usage

At first, configure your Amplifu OAuth2 client:

```tsx
import { Auth } from 'aws-amplify';

Auth.configure({
  userPoolId: 'YOUR_AWS_COGNITO_USER_POOL_ID',
  region: 'YOUR_AWS_COGNITO_REGION',
  userPoolWebClientId: 'YOUR_AWS_COGNITO_WEB_CLIENT_ID',
  oauth: {
    redirectSignIn: 'YOUR_AWS_COGNITO_SIGN_IN_REDIRECT',
    redirectSignOut: 'YOUR_AWS_COGNITO_SIGN_OUT_REDIRECT',
  }
});
```

Then, add the context in your main application component:

```tsx
import { OAuthProvider } from '@ivyhjk/amplify-react-oauth';

const App: React.Fc = () => (
  <OAuthProvider>
    {/* ... */}
  </OAuthProvider>
);
```


### Hooks

**Federated sign in (with Google)**:

```tsx
import React from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useFederatedSignIn } from '@ivyhjk/amplify-react-oauth';

const Component: React.FC = () => {
  const [signIn, { loading, error, user }] = useFederatedSignIn();

  const handleSignIn = React.useCallback(() => {
    signIn(CognitoHostedUIIdentityProvider.Google);
  }, [signIn]);

  if (error) {
    return (
      <p>error: {error.message}</p>
    );
  }

  if (user) {
    return (
      <p>welcome, {user.name}</p>
    );
  }

  return (
    <button disabled={loading} onClick={handleSignIn}>
      Federated sign in
    </button>
  );
};

export default Component;
```

**Get the current OAuth user**:

```tsx
import React from 'react';
import { useCurrentOAuthAuthenticatedUser } from '@ivyhjk/amplify-react-oauth';

const Component: React.FC = () => {
  const { user, loading, error } = useCurrentOAuthAuthenticatedUser();

  if (loading) {
    return (
      <p>loading...</p>
    );
  }

  if (error) {
    return (
      <p>error: {error.message}</p>
    );
  }

  return (
    <p>username: {user.name}</p>
  );
};

export default Component;
```

**Get the current OAuth user fast (from cache, user should be previously authenticated)**:

```tsx
import React from 'react';
import { useUserPayload } from '@ivyhjk/amplify-react-oauth';

const Component: React.FC = () => {
  const user = useUserPayload();

  return (
    <p>username: {user.name}</p>
  );
};

export default Component;
```


**Signing out**:

```tsx
import React from 'react';
import { useSignOut } from '@ivyhjk/amplify-react-oauth';

const Component: React.FC = () => {
  const [signOut, { loading, error, user }] = useSignOut();

  const handleSignOut = React.useCallback(() => {
    signOut();
  }, [signOut]);

  if (loading) {
    return (
      <p>loading...</p>
    );
  }

  if (error) {
    return (
      <p>error: {error.message}</p>
    );
  }

  if (user) {
    return (
      <div>
        <p>username: {user.name}</p>

        <button disabled={loading} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <p>signed out</p>
  );
};

export default Component;
```

