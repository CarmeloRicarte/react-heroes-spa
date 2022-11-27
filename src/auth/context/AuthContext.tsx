import { createContext } from "react";
import { AuthState } from "../interfaces/AuthState";

export type AuthContextProps = {
  authState: AuthState;
  login: (name: string) => void;
};
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
