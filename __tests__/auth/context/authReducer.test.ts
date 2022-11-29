import { expect, describe, test } from "vitest";

import { authReducer } from "../../../src/auth/context/authReducer";
import { AuthTypes } from "../../../src/auth/types/AuthTypes";
describe("Tests for authReducer.ts", () => {
  test("should return initial state", () => {
    const state = authReducer({ logged: false }, { type: "" });
    expect(state).toEqual({
      logged: false,
    });
  });

  test("should call login and set user", () => {
    const state = {
      logged: false,
    };
    const action = {
      type: AuthTypes.login,
      payload: {
        id: "123",
        name: "Carmelo",
      },
    };

    expect(authReducer(state, action)).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("should call logout", () => {
    const state = {
      logged: true,
    };
    const action = {
      type: AuthTypes.logout,
    };
    expect(authReducer(state, action)).toEqual({
      logged: false,
    });
  });
});
