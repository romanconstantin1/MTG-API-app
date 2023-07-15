import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";

import { detailedLog } from "../../utils/detailedLog";

export const SavedDecksDisplay = () => {
    const { store, actions } = useContext(Context);

    const handleDeleteDeck = (deckData) => {
        actions.deleteDeck(deckData)
    }
    
    const deckDisplayBuilder = () => {
        if (store?.savedDecks[0] == "default") {
            return <h1>Loading saved decks...</h1>
        } else if (store.savedDecks?.length > 0) {
            return (
                <div>
                    {store.savedDecks.map((entry, index) => (        
                        <div key={index}>
                            <h1>Deck: {entry.deckname}</h1>
                            <h1>Format: {entry.format}</h1>
                            <Link 
                                id="view-deck-link" 
                                to={`/decks/single/${
                                    encodeURIComponent(JSON.stringify(
                                        {
                                            "deckname": entry.deckname,
                                            "id": entry.id
                                        }
                                    ))
                                }`}>
                                <button className="mx-1">View this deck</button>
                            </Link>
                            
                            <button onClick={() => handleDeleteDeck(entry)}>Delete this deck</button>
                            <button className="mx-1" onClick={() => console.log(entry)}>Test</button>
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