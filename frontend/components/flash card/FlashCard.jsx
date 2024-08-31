import React, { useState } from "react";
import "./FlashCard.css";

function FlashCard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <h3 className="title mb-3">Question</h3>
          <p>{front}</p>
          <p className="lead fs-5 mt-5">Click to Show Answer!</p>
        </div>
        <div className="flip-card-back">
          <h3 className="title mb-3">Answer</h3>
          <p>{back}</p>
          <p className="lead fs-5 mt-5">Click to Show Question!</p>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
