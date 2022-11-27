import { AuthTypes } from "../types/AuthTypes";

export const authReducer = (
  state = { logged: false },
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case AuthTypes.login:
      return { ...state, logged: true, name: action.payload };
    case AuthTypes.logout:
      return { logged: false };
    default:
      return state;
  }
};
