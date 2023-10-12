import React from "react";
import styled from "styled-components";

export default function MovieCard({ movie }) {
  return (
    <CardWrapper className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p className="rating">Rating: {movie.vote_average}</p>
      <p className="relaeasedDate">Released Date: {movie.release_date}</p>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  flex: auto;
  max-width: calc(18% - 20px); /* Adjust the width of each card */
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  color: #fff;
  background-color: #2b3035;
  transition: transform 0.5s;

  h2 {
    font-size: 1.4rem;
    padding: 20px 0 5px 10px;
  }
  p {
    font-size: 1.2rem;
  }

  .rating {
    padding: 0 10px;
  }
  .relaeasedDate {
    padding: 0 0 10px 10px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  &:hover {
    transform: scale(1.03);
  }
`;
