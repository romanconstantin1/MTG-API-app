import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SavedDecksDisplay = () => {
    const { store, actions } = useContext(Context);

    const handleClick = (deckData) => {
        actions.deleteDeck(deckData)
    }
    
    const deckDisplayBuilder = () => {
        if (store.savedDecks.length > 0) {
            return (
                <div>
                    {store.savedDecks.map((entry, index) => (
                        <div key={index}>
                            <h1>Deck: {entry.name}</h1>
                            <h1>Format: {entry.format}</h1>
                            <button onClick={() => handleClick(entry)}>Delete this deck</button>
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