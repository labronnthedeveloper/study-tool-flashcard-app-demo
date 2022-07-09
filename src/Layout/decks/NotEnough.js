import React from "react";
import { Link } from "react-router-dom";

export default function NotEnoughCards({ deck }) {
  return (
    <React.Fragment>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length}{" "}
        cards in this deck.
      </p>
      <Link className='btn btn-primary' to={`/decks/${deck?.id}/cards/new`}>
        <i className='bi bi-plus-lg'></i> Add Cards
      </Link>
    </React.Fragment>
  );
};