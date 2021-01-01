# React Amplify core authentication provider

React core authentication provider based on top of AWS Amplify

## Install

with NPM:

```bash
npm install @ivyhjk/amplify-react-core-auth
```

with yarn:

```bash
yarn add @ivyhjk/amplify-react-core-auth
```

## Usage

Put the context in your main application component:

```tsx
import { CoreAuthContext } from '@ivyhjk/amplify-react-core-auth';

const App: React.Fc = () => (
  <CoreAuthContext>
    {/* ... */}
  </CoreAuthContext>
);
```

### Hooks

Get the current authenticated user, directly from amplify, without cache:

```tsx
import { useCurrentAuthenticatedUser } from '@ivyhjk/amplify-react-core-auth';

const UserComponent: React.FC = () => {
  const { error, loading, user } = useCurrentAuthenticatedUser();

  return (
    <p>
      Welcome {user.name}
    </p>
  );
}
```

Get the current authenticated user, from context (fastest):

```tsx
import { useUser } from '@ivyhjk/amplify-react-core-auth';

const UserComponent: React.FC = () => {
  const user = useUser();

  return (
    <p>
      Welcome {user.name}
    </p>
  );
}
```

