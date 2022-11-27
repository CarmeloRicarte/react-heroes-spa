import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

interface PublicRouteProps {
  children: JSX.Element;
}
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { authState } = useContext(AuthContext);
  const { logged } = authState;
  // if the user isn't logged in, then navigates to children routes. If not, navigates to root route
  return !logged ? children : <Navigate to="/" />;
};
