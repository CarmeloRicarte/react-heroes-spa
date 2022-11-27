import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

interface PrivateRouteProps {
  children: JSX.Element;
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authState } = useContext(AuthContext);
  const { logged } = authState;
  // if the user is logged in, then navigates to children routes. If not, navigates to login route
  return logged ? children : <Navigate to="/login" />;
};
