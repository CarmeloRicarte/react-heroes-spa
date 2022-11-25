import { HEROES } from "../data/heroes";

/**
 * "Return the hero whose id matches the id argument."
 *
 * The function takes one argument, id, and returns the hero whose id property matches the argument
 * @param {string} id - string - The id of the hero to find.
 * @returns A function that takes an id and returns a hero.
 */
export const getHeroById = (id: string) => {
  return HEROES.find((h) => h.id === id);
};
