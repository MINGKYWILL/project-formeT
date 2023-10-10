import { useState, useEffect } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import GenreFilter from "../component/GenreFilter";
import RatingFilter from "../component/RatingFilter";
import YearFilter from "../component/YearFilter";
import MovieCard from "../component/MovieCard";
import Nav from "../component/Nav";
import "./Pick.css";
import NavFunction from "./Home";

export default function Pick() {
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);

  NavFunction();

  useEffect(() => {
    async function fetchPagesInRange() {
      const apiKey = "";
      const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
      const language = "en-US";

      const pages = [];
      for (let page = 1; page <= 7; page++) {
        const response = await axios.get(
          `${baseUrl}?api_key=${apiKey}&language=${language}&page=${page}`
        );
        pages.push(response.data.results);
        console.log(pages);
      }
      setMovies(pages.flat());
      setLoading(false);
    }

    fetchPagesInRange().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <>
      <Nav />

      <Filters>
        <FilterColumn>
          <GenreFilter
            selectedGenres={selectedGenres}
            onSelectGenres={setSelectedGenres}
          />
        </FilterColumn>
        <FilterColumn>
          <RatingFilter
            selectedRating={selectedRating}
            onSelectRating={setSelectedRating}
          />
        </FilterColumn>
        <FilterColumn>
          <YearFilter
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />
        </FilterColumn>
      </Filters>
      <div className="movie-list">
        {loading ? (
          <p>Loading..</p>
        ) : movies.length > 0 ? (
          movies
            .filter((movie) => {
              const genreMatches =
                selectedGenres.length === 0 ||
                movie.genre_ids.some((genreId) =>
                  selectedGenres.includes(genreId)
                );
              const ratingMatches = movie.vote_average >= selectedRating;
              const yearMatches =
                selectedYear === "" ||
                new Date(movie.release_date).getFullYear().toString() ===
                  selectedYear;

              return genreMatches && ratingMatches && yearMatches;
            })
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found😢</p>
        )}
      </div>
    </>
  );
}

const Filters = styled.div`
  background-color: #6741d9;
  border-radius: 10px;
  display: flex;
  margin: 12rem auto;
  width: 85%;
  justify-content: space-between;
  align-items: center;
`;

const FilterColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  color: #101010;
`;
