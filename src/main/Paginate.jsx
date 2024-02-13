import "./Paginate.css";

import React from "react";

const Paginate = ({ totalPages, currentPage, setCurrentPageNumber }) => {
  const completePageNumberList = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  function pageNumberToDisplay() {
    if (currentPage < 5) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage > totalPages - 4) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return completePageNumberList.slice(currentPage - 1, currentPage + 6);
  }

  const currentFiveNumberToDisplay = pageNumberToDisplay();

  const handlePrevNext = (prevOrNext) => {
    return () => {
      if (prevOrNext === "previous") {
        if (currentPage === 1) return;

        setCurrentPageNumber((currPage) => currPage - 1);
      } else {
        if (currentPage === totalPages) return;
        else setCurrentPageNumber((currPage) => currPage + 1);
      }
    };
  };

  const handleExactPageNumberChange = (exactPageNumber) => {
    setCurrentPageNumber(exactPageNumber);
  };
  return (
    <div className="paginate-container">
      <div>
        <button
          onClick={handlePrevNext("previous")}
          className="page-change-button"
        >
          Prev
        </button>
      </div>
      <div className="specific-page-number-buttons">
        {currentFiveNumberToDisplay.map((pgNumber) => (
          <button
            onClick={() => handleExactPageNumberChange(pgNumber)}
            className="page-number-button"
          >
            {pgNumber}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handlePrevNext("next")} className="page-change-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginate;
