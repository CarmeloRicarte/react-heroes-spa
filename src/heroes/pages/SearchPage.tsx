import { HeroCard } from "../components";
import { useForm } from "../../hooks";
import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";
interface FormData {
  searchText: string;
}
export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search); // divide query params
  const heroes = getHeroesByName(q + "");
  const showSearch = q?.length === 0;
  const showError = q && q?.length > 0 && heroes.length === 0;
  const { searchText, onInputChange } = useForm<FormData>({
    searchText: q + "",
  });

  const onSearchSubmit = (
    event:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate(`${location.pathname}?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              data-testid="search-input"
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
          </form>

          <button
            data-testid="search-button"
            type="submit"
            onClick={onSearchSubmit}
            className="btn btn-outline-primary mt-3"
          >
            Search
          </button>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>
          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
