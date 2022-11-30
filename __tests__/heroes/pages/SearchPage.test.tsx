import { describe, test, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
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
describe("Tests of <SearchPage />", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("should show correctly with default value", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("should show Batman and the input with the same value as queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByTestId("search-input") as HTMLInputElement;
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(input.value).toBe("batman");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    expect(screen.getByTestId("searchAHeroDiv").style.display).toBe("none");
  });

  test("should show an error if the hero is not found(batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId("noHeroAlert").style.display).not.toBe("none");
  });

  test("should call navigate to new screen", () => {
    // ingress value
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByTestId("search-input") as HTMLInputElement;
    fireEvent.input(input, { target: { value: "hulk" } });
    // fire submit event with button that have a submit event
    fireEvent.click(screen.getByTestId("search-button"));
    // get input value to call navigate with this argument
    expect(mockedUseNavigate).toHaveBeenCalledWith(`/search?q=${input.value}`);
  });
});
