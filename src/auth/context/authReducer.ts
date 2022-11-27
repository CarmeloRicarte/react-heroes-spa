import { AuthTypes } from "../types/AuthTypes";

export const authReducer = (
  state = { logged: false },
  action: { type: string; payload: { id: string; name: string } }
) => {
  switch (action.type) {
    case AuthTypes.login:
      return { ...state, logged: true, user: action.payload };
    case AuthTypes.logout:
      return { logged: false };
    default:
      return state;
  }
};
