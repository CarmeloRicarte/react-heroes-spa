import { HEROES } from "../data/heroes";

/**
 * "If the publisher is not valid, throw an error, otherwise return the heroes that match the
 * publisher."
 * @param {string} publisher - string - This is the parameter that we're passing into the function.
 * @returns An array of heroes
 */
export const getHeroesByPublisher = (publisher: string) => {
  const validPublisher = ["Marvel Comics", "DC Comics"];
  if (!validPublisher.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return HEROES.filter((hero) => hero.publisher === publisher);
};
