import React from "react";
import styled from "styled-components";

function RatingFilter({ selectedRating, onSelectRating }) {
  const handleRatingChange = (e) => {
    onSelectRating(parseFloat(e.target.value));
    console.log(e.target);
  };
  return (
    <RatingWrapper>
      <h2>Rating</h2>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={selectedRating}
          onChange={handleRatingChange}
        />
        <span>{selectedRating}</span>
      </div>
    </RatingWrapper>
  );
}

export default RatingFilter;

const RatingWrapper = styled.div`
  h2 {
    font-size: 1.8rem;
  }
  div {
    display: flex;
    gap: 1rem;
  }
  span {
    font-size: 1.4rem;
  }
`;
