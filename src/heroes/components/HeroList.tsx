import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getHeroesByPublisher } from "../helpers";

export const HeroList: FC<{ publisher: string }> = ({ publisher }) => {
  const heroes = getHeroesByPublisher(publisher);
  return (
    <>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <Link to={hero.id}>{hero.superhero}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
