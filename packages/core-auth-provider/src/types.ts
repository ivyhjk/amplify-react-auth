export interface BaseAuthCoreContextValue<TUser> {
  error?: Error;
  loading: boolean;
  user?: TUser;
}

export type AuthCoreContextDispatcher<TUser> = React.Dispatch<
  React.SetStateAction<BaseAuthCoreContextValue<TUser>>
>;

export interface AuthCoreContextValue<TUser> extends BaseAuthCoreContextValue<TUser> {
  dispatch: AuthCoreContextDispatcher<TUser>
}

export type AuthContextFunction<TUser, T extends Array<unknown> = []> = (
  dispatcher: AuthCoreContextDispatcher<TUser>
) => (...args: T) => (void | Promise<void>);
