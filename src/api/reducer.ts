import { ILoginResponse, IPlaceResponse } from "./@types";

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
  setPlaces = "LOAD SITES",
  setServices = "LOAD SERVICES",
  setIsLoading = "SET LOADING",
}

type AuthPayload = {
  [Types.login]: {
    [key in keyof ILoginResponse]: ILoginResponse[key];
  };
  [Types.logout]: unknown;
};

type placesPayload = {
  [Types.setPlaces]: IPlaceResponse[];
};
type servicesPayload = {
  [Types.setServices]: { name: string; icon: string; desc: string }[];
};
type loadingPayload = {
  [Types.setIsLoading]: boolean;
};

export type authActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
export type placesActions =
  ActionMap<placesPayload>[keyof ActionMap<placesPayload>];
export type loadingActions =
  ActionMap<loadingPayload>[keyof ActionMap<loadingPayload>];
export type servicesActions =
  ActionMap<servicesPayload>[keyof ActionMap<servicesPayload>];

export const authReducer = <S>(
  state: S,
  action: authActions | placesActions | loadingActions | servicesActions
) => {
  switch (action.type) {
    case Types.login:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    case Types.logout:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    case Types.setPlaces:
      return {
        ...state,
        places: action.payload,
      };

    case Types.setServices:
      return {
        ...state,
        services: action.payload,
      };

    case Types.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
