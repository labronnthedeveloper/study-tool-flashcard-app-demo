import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck, updateCard } from "../../utils/api/index";

export default function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    const name = deck.name ? deck.name : "Deck";

    //useEffect is used for both loading the deck and the individual card.
    useEffect(() => {
        const abortCon = new AbortController();

        //Deck navbar info
        async function loadDeck() {
            try {
                const deckInfo = await readDeck(deckId, abortCon.signal);
                setDeck(deckInfo);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("aborted");
                } else {
                    throw error;
                };
            };
        };

        //Load the cards to pre-fill card information to be edited
        async function loadCard() {
            try {
                const cardInfo = await readCard(cardId, abortCon.signal);
                setCard(cardInfo);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("aborted");
                } else {
                    throw error;
                };
            };
        };

        loadDeck();
        loadCard();

        return () => abortCon.abort();
    }, [deckId, cardId]);

    //The card is updated and we use history to return the screen.
    async function handleSubmit(card) {
        try {
            await updateCard(card);
            history.push(`/decks/${deckId}`);
        } catch (error) {
            throw error;
        };
    };

    //History for deck detais for deckId
    function handleCancel() {
        history.push(`/decks/${deckId}`);
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
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h1>{name}: Add Card</h1>
            <CardForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                card={card}
            />
        </div>
    );
};