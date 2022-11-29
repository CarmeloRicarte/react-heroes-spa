import { vi, describe, test, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MarvelPage } from "../../src/heroes";

describe("Tests of PublicRoute", () => {
  test("should show children component if the user is not authenticated", () => {
    const contextValue = {
      authState: {
        logged: false,
      },
      login: vi.fn(),
      logout: vi.fn(),
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Public Route")).toBeTruthy();
  });

  test("should navigate to root route if the user is authenticated", () => {
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
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />
            <Route path="/" element={<MarvelPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // this is the title of the root route that is navigating to marvel
    expect(screen.getByText("Marvel Comics")).toBeTruthy();
  });
});
