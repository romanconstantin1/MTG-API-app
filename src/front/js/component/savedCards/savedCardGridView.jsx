import React, { useState, useContext } from "react";

import { Context } from "../../store/appContext";

import { checkFormatLegality } from "../../utils/checkLegality";
import { checkMaxQty } from "../../utils/checkMaxQty";
import { detailedLog } from "../../utils/detailedLog";

export const SavedCardInGrid = (cardData) => {
    const { store, actions } = useContext(Context);
    const [ deckID, setDeckID ] = useState('');
    const [ deckFormat, setDeckFormat ] = useState('');
    const cardEntry = cardData.cardData 

    const handleDelete = (cardData) => actions.deleteCard(cardData);
    
    const handleSelectDeck = (selectElement) => {
        const selectedDeckId = selectElement.value;
        const selectedDeckData = store.savedDecks.find(
            deckEntry => deckEntry.id == selectedDeckId)
        setDeckID(selectedDeckId)
        setDeckFormat(selectedDeckData.format)
    }

    const handleAddToDeck = (cardData) => {
        if (deckID === '') {
            alert('Select a deck first');
            return;
        }
        detailedLog(cardData)
        //returns true if card is legal in the deck's format, deck format name if not
        const checkIfLegal = checkFormatLegality(cardData, store.savedDecks, deckID, true);
        //returns true if adding a card does not exceed the max quantity in the deck
        if (checkIfLegal === true) {
            actions.addSavedCardToDeck(deckID, cardData);
        } else {
            alert(`${cardData.cardname} is not legal in the ${checkIfLegal} format`);
        }
    };

    

    return (
        <div className="text-center">
            <div>
                <img
                    src={cardEntry.image_small}
                        style={{ width: '200px', height: '300px', borderRadius: '9px' }}
                        onClick={() => console.log(cardEntry)}
                />
            </div>
            <div className="m-2">
                <select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target)}>
                    <option value="">Select a saved deck</option>
                    {store.savedDecks.map((deckEntry) => (
                    <option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
                    ))}
                </select>

                <button className="ms-1" onClick={() => handleAddToDeck(cardEntry)}>Add to deck</button>
            </div>
            <div className="m-2">
                <button onClick={() => handleDelete(cardEntry)}>Delete this card</button>
            </div>
        </div>
    )
}