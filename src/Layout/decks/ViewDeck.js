import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import NotFound from "../NotFound";
import CardList from "./CardList";

export default function ViewDeck() {
  const [deckInfo, setDeckInfo] = useState({});
  const { deckId } = useParams();
  const { name, description } = deckInfo;
  const { url } = useRouteMatch();
  const history = useHistory();

  //Loads deck information. If deck isn't found, display not found
  const getDeckDetails = useCallback(async () => {
    try {
      const deck = await readDeck(deckId);
      setDeckInfo(deck);
    } catch (error) {
      setDeckInfo({ name: "Not Found" });
    }
  }, [deckId]);

  //Load deck information on any change to deck id.
  //getDeckDetails is needed as a dependancy because it is defined outside useEffect
  useEffect(() => {
    getDeckDetails();
  }, [deckId, getDeckDetails]);

  //Deletes card and re-loads deck information
  async function deleteHandler(id) {
    if (
      window.confirm("Delete this card?\n\nThis action cannot be undone.")
    ) {
      await deleteCard(id);
      getDeckDetails();
    };
  };

  // incorrect deckId
  if (name === "Not Found") return <NotFound />;

  //Deletes deck and goes back to home page
  async function handleDeleteDeck() {
    if (
      window.confirm("Delete this deck?\n\nThis action cannot be undone.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    };
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='bi bi-house-door-fill'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {name}
          </li>
        </ol>
      </nav>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className='d-flex'>
        <Link className='btn btn-secondary mr-2 p-2' to={`${url}/edit`}>
          <i className='bi bi-pencil-fill'></i> Edit
        </Link>
        <Link className='btn btn-primary mr-2 p-2' to={`${url}/study`}>
          <i className='bi bi-book'></i> Study
        </Link>
        <Link className='btn btn-primary p-2' to={`${url}/cards/new`}>
          <i className='bi bi-plus-lg'></i> Add Cards
        </Link>
        <button
          className='btn btn-danger ml-auto p-2'
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>
      <CardList deck={deckInfo} deleteHandler={deleteHandler} />
    </div>
  );
};