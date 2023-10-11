import React from "react";
import styled from "styled-components";

function YearFilter({ selectedYear, onSelectYear }) {
  const handleYearChange = (e) => {
    onSelectYear(e.target.value);
  };
  const curYear = new Date().getFullYear();
  return (
    <YearWrapper>
      <h2>Released Year</h2>
      <div>
        <input
          type="range"
          min="2000"
          max={curYear}
          step="1"
          value={selectedYear}
          onChange={handleYearChange}
        />
        <span>{selectedYear}</span>
      </div>
    </YearWrapper>
  );
}

export default YearFilter;

const YearWrapper = styled.div`
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
