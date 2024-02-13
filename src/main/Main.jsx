import "./Main.css";

import React, { useEffect, useRef, useState } from "react";

import Cards from "./Cards";
import Paginate from "./Paginate";

const Main = () => {
  const [searchField, setSearchField] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentCards, setCurrentCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterInProgress, setFilterInProgress] = useState(false);
  const [error, setError] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  const totalPages = useRef(0);
  const totalCharacters = useRef(0);
  const handleSearchFieldChange = (e) => setSearchField(e.target.value);

  useEffect(() => {
    if (searchField.length > 0) {
      setFilterInProgress(true);
      setFilteredList(() => {
        return currentCards.filter((c) => {
          return c.name.toLowerCase().includes(searchField.toLowerCase());
        });
      });
    } else {
      setFilterInProgress(false);
    }
  }, [currentCards, filterInProgress, searchField, searchField.length]);

  useEffect(() => {
    async function makeSwapiApiCall() {
      try {
        setLoading(true);
        const URL = process.env.REACT_APP_SWAPI_API_ENDPOINT.replace(
          "%%PAGE_NUMBER%%",
          currentPageNumber
        );

        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Some error occured. Please try again in some time.");
        }
        const jsonData = await response.json();
        if (jsonData.detail && jsonData.detail === "Not found") {
          throw new Error("Invalid Page Number");
        }
        setCurrentCards([...jsonData.results]);
        totalCharacters.current = jsonData.count;
        totalPages.current = Math.floor(totalCharacters.current / 10 + 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    makeSwapiApiCall();
  }, [currentPageNumber]);
  return (
    <main>
      <div className="search-container">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchField}
          onChange={(e) => handleSearchFieldChange(e)}
        />
      </div>
      <div className="cards-container">
        <Cards
          loading={loading}
          currentCards={filterInProgress ? filteredList : currentCards}
          error={error}
        />
      </div>
      <div className="paginate-outer-container">
        <Paginate
          totalPages={totalPages.current}
          currentPage={currentPageNumber}
          setCurrentPageNumber={setCurrentPageNumber}
        />
      </div>
    </main>
  );
};

export default Main;
