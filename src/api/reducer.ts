import {
  Booking,
  IPlace,
  IPlaceResponse,
  IUser,
  IUserResponse,
} from "./@types";

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

export const defaultBooking: Booking = {
  date: "",
  duration: "",
  place: "",
  numGuests: "",
  userId: "",
};

export const defaultUser: IUser = {
  email: "",
  displayName: "",
  phone: "",
  photoURL: "",
};

export const defaultPlace: IPlace[] = [
  {
    name: "",
    about: "",
    images: [""],
    tags: "",
    id: "",
  },
];

export enum Types {
  login = "LOGIN",
  logout = "LOGOUT",
  setPlaces = "LOAD SITES",
  setServices = "LOAD SERVICES",
  setIsLoading = "SET LOADING",
}

type AuthPayload = {
  [Types.login]: IUserResponse;
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
        user: {
          ...action.payload,
        },
        isLoggedIn: true,
      };

    case Types.logout:
      localStorage.removeItem("tour-user");
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
