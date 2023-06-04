import React, { useReducer, createContext, Dispatch } from "react";
import { authActions, authReducer } from "./reducer";

const initialState = {
  user: {
    displayName: "",
    email: "",
    emailVerified: "",
    phoneNumber: "",
    metadata: {
      createdAt: "",
      creationTime: "",
      lastLoginAt: "",
      lastSignInTime: "",
    },
    photoURL: "",
  },
};

type initialStateType = typeof initialState;

export const AppContext = createContext<{
  state: initialStateType;
  dispatch: Dispatch<authActions>;
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
