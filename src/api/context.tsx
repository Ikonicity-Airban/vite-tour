import React, { useReducer, createContext, Dispatch } from "react";
import {
  authActions,
  authReducer,
  loadingActions,
  placesActions,
} from "./reducer";
import carousel1 from "/carousel/1.jpeg";
import carousel2 from "/carousel/2.jpeg";
import carousel4 from "/carousel/4.jpeg";
import carousel5 from "/carousel/5.jpeg";

const initialState = {
  user: {
    displayName: "",
    email: "",
    emailVerified: "",
    phoneNumber: "",
    photoURL: "",
    metadata: {
      createdAt: "",
      creationTime: "",
      lastLoginAt: "",
      lastSignInTime: "",
    },
  },
  isLoggedIn: false,
  carousel: [carousel1, carousel2, carousel4, carousel5],
  isLoading: false,
  places: [
    {
      about: "",
      images: [""],
      tags: "",
      id: "",
    },
  ],
};

type initialStateType = typeof initialState;

export const AppContext = createContext<{
  state: initialStateType;
  dispatch: Dispatch<authActions | placesActions | loadingActions>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer<initialStateType>,
    initialState
  );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
