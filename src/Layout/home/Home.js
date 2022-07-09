
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import DeckLayout from "./DeckLayout";

export default function Home() {
    const [decks, setDecks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setDecks([]);
        const abortCon = new AbortController();

        async function loadDecks() {
            try {
                let _decks = await listDecks(abortCon.signal);
                setDecks(_decks);
                setLoaded(true);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadDecks();
        return () => {
            console.log("aborting");
            abortCon.abort();
        }
    }, []);


    //Deletes a deck and triggers a re-render with the deck removed
    async function handleDeleteDeck(id) {
        if (
            window.confirm("Delete this deck?\n\nThis action cannot be undone.")
        ) {
            await deleteDeck(id);
            setDecks(() => decks.filter((deck) => deck.id !== id));
        };
    };

    //Maps array method applied to decks, spread operator is used, and the handle delete click is passed in to each. 
    const rows = decks.map((deck) => DeckLayout({ ...deck, handleDeleteDeck }));

    
    

    return (
        <React.Fragment>
        <div className='row'>
            <Link to='/decks/new' className='btn btn-secondary'>
                <i className='bi bi-plus-lg'></i> Create Deck
            </Link>
        </div>
        <div className='row my-4'>{rows}</div>
        </React.Fragment>
    );
};