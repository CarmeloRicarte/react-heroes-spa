import { useReducer } from "react";
import { AuthState } from "../interfaces";
import { AuthTypes } from "../types";
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

  const login = (name = "") => {
    const action = {
      type: AuthTypes.login,
      payload: {
        id: (Math.random() * 10).toString(),
        name,
      },
    };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
