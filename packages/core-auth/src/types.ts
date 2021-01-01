export interface BaseCoreAuthContextValue<TUser> {
  error?: Error;
  loading: boolean;
  user?: TUser;
}

export type CoreAuthContextDispatcher<TUser> = React.Dispatch<
  React.SetStateAction<BaseCoreAuthContextValue<TUser>>
>;

export interface CoreAuthContextValue<TUser> extends BaseCoreAuthContextValue<TUser> {
  dispatch: CoreAuthContextDispatcher<TUser>
}

export type AuthContextFunction<TUser, T extends Array<unknown> = []> = (
  dispatcher: CoreAuthContextDispatcher<TUser>
) => (...args: T) => (void | Promise<void>);
