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

Put the context in your main application component:

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