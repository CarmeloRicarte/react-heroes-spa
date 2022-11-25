import { HEROES } from "../data/heroes";
import { Hero } from "../models";

export const getHeroesByName = (name = "") => {
  name = name.toLocaleLowerCase().trim();
  if (name.length === 0) return [];
  return HEROES.filter((hero: Hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
