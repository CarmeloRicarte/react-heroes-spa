import { ReducerState, useReducer } from "react";
import { AuthState } from "../interfaces";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const initialState: AuthState = {
  logged: false,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
