import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthCoreContextDispatcher = React.Dispatch<
  React.SetStateAction<Omit<AuthCoreContextValue, 'dispatch'>>
>;

export interface AuthCoreContextValue {
  error?: Error;
  loading: boolean;
  user?: CognitoUser;
  dispatch: AuthCoreContextDispatcher
}

export type AuthContextFunction<T extends Array<unknown> = []> = (
  dispatcher: AuthCoreContextDispatcher
) => (...args: T) => (void | Promise<void>);
