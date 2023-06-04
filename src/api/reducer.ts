import { ILoginResponse } from "./@types";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  login = "LOGIN",
  logout = "LOGOUT",
}

type AuthPayload = {
  [Types.login]: {
    [key in keyof ILoginResponse]: ILoginResponse[key];
  };
  [Types.logout]: unknown;
};

export type authActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = <S>(state: S, action: authActions) => {
  switch (action.type) {
    case Types.login:
      return {
        ...state,
        ...action.payload,
      };

    case Types.logout:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
