import React from "react";
import { Link } from "react-router-dom";


export default function CardDetails({ id, front, back, deckId, deleteHandler }) {
  return (
    <div className='card my-1' key={id}>
      <div className='card-body'>
        <div className='card-content d-flex'>
          <p className='card-text mx-2'>{front}</p>
          <p className='card-text mx-2'>{back}</p>
        </div>
        <div className='d-flex justify-content-end'>
          <Link
            className='btn btn-secondary'
            to={`/decks/${deckId}/cards/${id}/edit`}
          >
            <i></i> Edit
          </Link>
          <button
            className='btn btn-danger ml-2'
            onClick={() => deleteHandler(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};