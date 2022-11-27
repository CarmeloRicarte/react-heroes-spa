import { useReducer } from "react";
import { AuthState } from "../interfaces";
import { AuthTypes } from "../types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const init = () => {
  const user = localStorage.getItem("user");
  return {
    logged: !!user,
    user: user && JSON.parse(user),
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = "") => {
    const user = {
      id: (Math.random() * 10).toString(),
      name,
    };

    const action = {
      type: AuthTypes.login,
      payload: user,
    };

    localStorage.setItem("user", JSON.stringify(user));
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
