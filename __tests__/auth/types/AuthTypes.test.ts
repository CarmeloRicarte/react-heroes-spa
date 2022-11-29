import { AuthTypes } from "./../../../src/auth";
describe("Tests of AuthTypes", () => {
  test("should retrun the auth types", () => {
    expect(AuthTypes).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
