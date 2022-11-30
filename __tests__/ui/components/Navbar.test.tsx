import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, vi, expect, beforeEach, afterEach } from "vitest";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Tests of <Navbar />", () => {
  const contextValue = {
    authState: {
      logged: true,
      user: {
        name: "Carmelo",
        id: "123",
      },
    },
    login: vi.fn(),
    logout: vi.fn(),
  };

  beforeEach(() => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("should show DC have active class in the link for page", () => {
    const links: HTMLElement[] = screen.getAllByRole("link");
    const dcLink = links.find((link) => link.textContent === "DC");
    dcLink && fireEvent.click(dcLink);
    expect(dcLink?.className).toContain("active");
  });

  test("should show Search have active class in the link for page", () => {
    const links: HTMLElement[] = screen.getAllByRole("link");
    const searchLink = links.find((link) => link.textContent === "Search");
    searchLink && fireEvent.click(searchLink);
    expect(searchLink?.className).toContain("active");
  });

  test("should show the username", () => {
    expect(screen.getByText("Carmelo")).toBeTruthy();
  });

  test("should call to logout and navigate when the user click on button", () => {
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {
      replace: true, // replace browser history
    });
  });
});
