import { vi, describe, test, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../src/router";
import { AuthContext, LoginPage } from "../../src/auth";

describe("Tests of PrivateRoute", () => {
  test("should show children component if the user is authenticated", () => {
    Storage.prototype.setItem = vi.fn(); // mock localStorage.setItem function

    const contextValue = {
      authState: {
        logged: true,
        user: {
          name: "foo",
          id: "123",
        },
      },
      login: vi.fn(),
      logout: vi.fn(),
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=hulk"]}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Private Route")).toBeTruthy();
    // check that localStorage is saving last path
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=hulk"
    );
  });

  test("should navigate to login route if the user is not authenticated", () => {
    const contextValue = {
      authState: {
        logged: false,
      },
      login: vi.fn(),
      logout: vi.fn(),
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeTruthy();
  });
});
