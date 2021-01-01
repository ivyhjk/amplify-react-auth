# React Native Amplify social authentication

React Native social authentication based on top of AWS Amplify

## Install

with NPM:

```bash
npm install @ivyhjk/amplify-react-native-social-auth
```

with yarn:

```bash
yarn add @ivyhjk/amplify-react-native-social-auth
```

## Usage

Put the context in your main application component:

```tsx
import { SocialAuthProvider } from '@ivyhjk/amplify-react-native-social-auth';

const App: React.Fc = () => (
  <SocialAuthProvider>
    {/* ... */}
  </SocialAuthProvider>
);
```

### Hooks

**Sign in with Google**:

```tsx
import { useGoogleSignIn } from '@ivyhjk/amplify-react-native-social-auth';
import { Button, Text, View } from 'react-native';

const Component: React.FC = () => {
  const [doGoogleSignIn, { loading, error, user }] = useGoogleSignIn();

  const handleGoogleSignIn = React.useCallback(() => {
    doGoogleSignIn();
  }, [doGoogleSignIn]);

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
      <Button disabled={loading} onPress={handleGoogleSignIn}>
        Google SignIn
      </Button>
    </View>
  );
};
```

**Sign out from Google**:

```tsx
import { useGoogleSignOut } from '@ivyhjk/amplify-react-native-social-auth';
import { Button, Text, View } from 'react-native';

const Component: React.FC = () => {
  const [doGoogleSignOut, { loading, error, user }] = useGoogleSignOut();

  const handleGoogleSignOut = React.useCallback(() => {
    doGoogleSignOut();
  }, [doGoogleSignOut]);

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {user && <Text>welcome, {user.name}</Text>}
      <Button disabled={loading} onPress={handleGoogleSignOut}>
        Google SignOut
      </Button>
    </View>
  );
};
```

**Get the current authenticated user, directly from amplify, without cache**:

```tsx
import { useCurrentAuthenticatedUser } from '@ivyhjk/amplify-react-native-social-auth';

const UserComponent: React.FC = () => {
  const { error, loading, user } = useCurrentAuthenticatedUser();

  return (
    <p>
      Welcome {user.name}
    </p>
  );
}
```

**Get the current authenticated user, from context (fastest)**:

```tsx
import { useUser } from '@ivyhjk/amplify-react-native-social-auth';

const UserComponent: React.FC = () => {
  const user = useUser();

  return (
    <p>
      Welcome {user.name}
    </p>
  );
}
```
