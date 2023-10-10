import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import NavFunction from "./Home";
import Nav from "../component/Nav";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    try {
      const apiKey = "";
      const baseUrl = `https://api.themoviedb.org/3/search/movie`;
      const language = "en-US";
      const response = await axios.get(
        `${baseUrl}?api_key=${apiKey}&language=${language}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  NavFunction();

  useEffect(() => {
    if (query.trim() !== "") {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <>
      <Nav />
      <SearchBar>
        <Icon />
        <SearchInput
          query={query}
          onQueryChange={(newQuery) => setQuery(newQuery)}
        />
        <NumResult movies={movies} />
      </SearchBar>
    </>
  );
}

function SearchBar({ children }) {
  return <nav className="search-bar">{children}</nav>;
}
function Icon() {
  return (
    <div className="search-icon">
      <h1>You just need..</h1>
      <span>🍿</span>
    </div>
  );
}
function SearchInput({ query, onQueryChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search movies.."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
}
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length} </strong>results
    </p>
  );
}
