import Card from "./Card";
import React from "react";

const Cards = ({ loading, currentCards, error }) => {
  if (loading) return <h3>Loading .....</h3>;
  if (error !== null) return <h3>{error}</h3>;

  return currentCards.map((cardData, idx) => (
    <div style={{ width: "50%" }}>
      <Card cardData={cardData} key={idx} />
    </div>
  ));
};

export default Cards;
