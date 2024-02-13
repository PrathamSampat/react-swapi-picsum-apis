import "./Card.css";

const Card = ({ cardData }) => {
  const getBackgroundColor = (hairColor) => {
    if (hairColor.includes(", ")) {
      if (hairColor.split(", ")[0] === "auburn") {
        return "#9A3001";
      } else {
        return hairColor.split(", ")[0];
      }
    } else if (hairColor === "none" || hairColor === "n/a") return "white";
    else if (hairColor === "blond") return "gold";
    else if (hairColor === "black") return "#5f5f5f";
    else return hairColor;
  };

  return (
    <div
      className="card-container"
      style={{ backgroundColor: getBackgroundColor(cardData["hair_color"]) }}
    >
      <p>NAME: {cardData.name.toUpperCase()}</p>
      <div className="img-container">
        <img
          src={process.env.REACT_APP_PICSUM_API_ENDPOINT.replace(
            "%%RANDOM_NUMBER%%",
            Math.floor(Math.random() * 100 + 1) ??
              process.env.REACT_APP_PICSUM_API_ENDPOINT
          )}
          alt="star war api avatar"
          height={"200px"}
          width={"200px"}
        />
      </div>
      <div>
        <p className="card-details">
          HAIR COLOR:
          {cardData["hair_color"] === "n/a" || cardData["hair_color"] === "none"
            ? "NOT APPLICABLE"
            : cardData["hair_color"].toUpperCase()}
        </p>
        <p className="card-details">
          SKIN COLOR: {cardData["skin_color"].toUpperCase()}
        </p>
        <p className="card-details">
          GENDER:
          {cardData["gender"] === "n/a"
            ? "Not Applicable"
            : cardData["gender"].toUpperCase()}
        </p>
        <p className="card-details">
          VEHICLE COUNT: {cardData.vehicles.length ?? 0}
        </p>
      </div>
    </div>
  );
};

export default Card;
