import { CognitoUser } from 'amazon-cognito-identity-js';

export interface BaseAuthCoreContextValue {
  error?: Error;
  loading: boolean;
  user?: CognitoUser;
}

export type AuthCoreContextDispatcher = React.Dispatch<
  React.SetStateAction<BaseAuthCoreContextValue>
>;

export interface AuthCoreContextValue extends BaseAuthCoreContextValue {
  dispatch: AuthCoreContextDispatcher
}

export type AuthContextFunction<T extends Array<unknown> = []> = (
  dispatcher: AuthCoreContextDispatcher
) => (...args: T) => (void | Promise<void>);
