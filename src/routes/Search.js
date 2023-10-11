import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import NavFunction from "./Home";
import Nav from "../component/Nav";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [clickedMovie, setClickedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setClickedMovie(movie);
  };

  const fetchMovies = async () => {
    try {
      const apiKey = "";
      const baseUrl = `https://api.themoviedb.org/3/search/movie`;
      const language = "en-US";
      const response = await axios.get(
        `${baseUrl}?api_key=${apiKey}&language=${language}&query=${query}`
      );
      setMovies(response.data.results);
      console.log(movies);
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
      setClickedMovie(null);
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

      <Main>
        <Box>
          <MovieList movies={movies} onListClick={handleMovieClick} />
        </Box>
        <Box>{clickedMovie && <MovieDetail movie={clickedMovie} />}</Box>
      </Main>
    </>
  );
}

function SearchBar({ children }) {
  return <nav className="search-bar">{children}</nav>;
}
function Icon() {
  return (
    <div className="search-icon">
      <h1>
        You just need..<span>🍿</span> and..?
      </h1>
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

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState("true");
  return (
    <div className="search-box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MovieList({ movies, onListClick }) {
  const searched = movies?.filter((movie) => movie.backdrop_path);
  return (
    <ul className="search-list">
      {searched?.map((movie) => (
        <li key={movie.id} onClick={() => onListClick(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <span>🎬 {movie.release_date}</span>
        </li>
      ))}
    </ul>
  );
}

function MovieDetail({ movie }) {
  return (
    <div className="movie-detail">
      <div className="movie-overview">
        <h3>{movie.title}</h3>
        <span> 🎬 {movie.release_date}</span>
        <p>{movie.overview}</p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
}
