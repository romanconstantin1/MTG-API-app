import React, { useState, useContext } from "react";

import { Context } from "../../store/appContext";

import { checkFormatLegality } from "../../utils/checkLegality";

export const SavedCardInGrid = (cardData) => {
    const { store, actions } = useContext(Context);
    const [ deckID, setDeckID ] = useState('');
    const cardEntry = cardData.cardData 

    const handleDelete = (cardData) => actions.deleteCard(cardData);
    
    const handleSelectDeck = (IDval) => setDeckID(IDval)

    const handleAddToDeck = (cardData) => {
        if (deckID === '') {
            alert('Select a deck first');
            return;
        }
        
        //returns true if card is legal in the deck's format, deck format name if not
        const checkIfLegal = checkFormatLegality(cardData, store.savedDecks, deckID, true);

        if (checkIfLegal === true) {
            actions.addSavedCardToDeck(deckID, cardData);
        } else {
            alert(`${cardData.cardname} is not legal in the ${checkIfLegal} format`);
        }
    };

    

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