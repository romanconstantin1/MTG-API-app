import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";
import { CardInDeck } from "./cardInDeck.jsx";

export const SavedDecksDisplay = () => {
    const { store, actions } = useContext(Context);

    const handleDeleteDeck = (deckData) => {
        actions.deleteDeck(deckData)
    }
    
    const deckDisplayBuilder = () => {
        if (store.savedDecks.length > 0) {
            return (
                <div>
                    {store.savedDecks.map((entry, index) => (
                        <div key={index}>
                            <h1>Deck: {entry.deckname}</h1>
                            <h1>Format: {entry.format}</h1>
                            <h1>Cards: </h1>
                            <div className="d-flex p-2">{entry.cards.map(cardindeck => (
                                <CardInDeck props={[cardindeck, entry]} />
                            ))}</div>
                            <button onClick={() => alert(`see all cards in ${entry.deckname}`)}>View this deck</button>
                            <button onClick={() => handleDeleteDeck(entry)}>Delete this deck</button>
                        </div>
                    ))}
                </div>
            )
        } else {
            return <h1>No saved decks</h1>
        }
    }
    
    return (
        <>
            {deckDisplayBuilder()}
        </>
        
    )
}