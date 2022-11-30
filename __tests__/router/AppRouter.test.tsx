import { describe, test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router";

describe("Tests of <AppRouter />", () => {
  test("should show login if the user is not authenticated", () => {
    const contextValue = {
      authState: {
        logged: false,
      },
      login: vi.fn(),
      logout: vi.fn(),
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("should show Marvel Component if the user is authenticated", () => {
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
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
