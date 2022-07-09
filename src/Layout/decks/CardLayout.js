import React, { useState } from "react";

export default function CardLayout({ handleNext, deck = { cards: [] }, cardId = 0 }) {
    const { cards } = deck;
    const card = cards[cardId] || {};
    const [isFlipped, setIsFlipped] = useState(true);

    function flipCard() {
        //Using ! as a toggle, it will invert the current state. 
        setIsFlipped(!isFlipped);
    };


    //conditionally rendering based on current side of card
    const nextButton = !isFlipped ? (
        <button
            className='btn btn-primary'
            onClick={() => {
                setIsFlipped(true);
                handleNext();
            }}
        >
            Next
        </button>
    ) : ("");

    return (
        <div className='card my-1'>
            <div className='p-2'>
                <h5 className='card-title'>
                    Card {cardId + 1} of {cards.length}
                </h5>
                <p className='card-text'>{ isFlipped ? card.front : card.back }</p>
                <button className='btn btn-secondary mr-2' onClick={flipCard}>
                    Flip
                </button>
                {nextButton}
            </div>
        </div>
    );
};