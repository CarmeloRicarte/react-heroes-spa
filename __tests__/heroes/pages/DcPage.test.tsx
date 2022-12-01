import { describe, test, expect, afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { DcPage } from "../../../src/heroes/pages/DcPage";

describe("Tests of <DcPage />", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("should show match with snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <DcPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
