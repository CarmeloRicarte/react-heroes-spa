import { describe, test, expect } from "vitest";
import { getHeroById } from "../../../src/heroes/helpers";
describe("Tests of getHeroById", () => {
  test("should get a hero passing an id", () => {
    const hero = getHeroById("dc-batman");
    expect(hero?.superhero).toBe("Batman");
  });
});
