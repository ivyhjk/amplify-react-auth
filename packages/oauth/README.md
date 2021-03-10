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

**Sign in with Google**:

```tsx
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useFederatedSignIn } from '@ivyhjk/amplify-react-oauth';
import { Button, Text, View } from 'react-native';

const Component: React.FC = () => {
  const [signIn, { loading, error, user }] = useFederatedSignIn();

  const handleSignIn = React.useCallback(() => {
    signIn(CognitoHostedUIIdentityProvider.Google);
  }, [signIn]);

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View>
        <Text>welcome, {user.name}</Text>
      </View>
    );
  }

  return (
    <View>
      <Button disabled={loading} onPress={handleSignIn}>
        Federated sign in
      </Button>
    </View>
  );
};
```
