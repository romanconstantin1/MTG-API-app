import React, { useState, useContext } from "react";

import { Context } from "../../store/appContext";

export const SavedCardInGrid = (cardData) => {
    const { store, actions } = useContext(Context);
    const [ deckID, setDeckID ] = useState('');
    const cardEntry = cardData.cardData 

    const handleDelete = (cardData) => {
        actions.deleteCard(cardData);
    };

    const handleAddToDeck = (cardData) => {
        if (deckID === '') {
            alert('Select a deck first');
        } else {
            actions.addSavedCardToDeck(deckID, cardData);
        }
    };

    const handleSelectDeck = (IDval) => {
        setDeckID(IDval)
    }

    return (
        <>
            <img
                src={cardEntry.image_small}
                    style={{ width: '200px', height: '300px', borderRadius: '9px' }}
                    onClick={() => console.log(cardEntry)}
            />
            <label htmlFor="deck-select">Add to deck:</label>
            <select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target.value)}>
                <option value="">Select a saved deck</option>
                {store.savedDecks.map((deckEntry) => (
                <option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
                ))}
            </select>

            <button onClick={() => handleAddToDeck(cardEntry)}>Add to deck</button>
            <button onClick={() => handleDelete(cardEntry)}>Delete this card</button>
        </>
    )
}