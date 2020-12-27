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
