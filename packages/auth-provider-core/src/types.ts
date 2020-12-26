import { CognitoUser } from 'amazon-cognito-identity-js';

export interface AuthState {
  error?: Error;
  loading: boolean;
  user?: CognitoUser;
}

export type AuthContextDispatcher = React.Dispatch<React.SetStateAction<AuthState>>;

export type AuthContextFunction<T extends Array<unknown> = []> = (
  dispatcher: AuthContextDispatcher
) => (...args: T) => void;
