import React, { useState, useContext } from "react";

import { Context } from "../../store/appContext";

import { checkFormatLegality } from "../../utils/checkLegality";
import { checkMaxQty } from "../../utils/checkMaxQty";
import { checkDeckSize } from "../../utils/checkDeckSize";
import { detailedLog } from "../../utils/detailedLog";

export const SavedCardControls = (cardData) => {
    const { store, actions } = useContext(Context);
    // const [ deckID, setDeckID ] = useState('');
    // const [ deckFormat, setDeckFormat ] = useState('');
    const [ deckData, setDeckData ] = useState(null);
    const [ changeVal, setChangeVal ] = useState(1);
    const cardEntry = cardData.cardData 

    const handleDelete = (cardData) => actions.deleteCard(cardData);
    
    const handleSelectDeck = (selectElement) => {
        const selectedDeckId = selectElement.value;
        const selectedDeckData = store.savedDecks.find(
            deckEntry => deckEntry.id == selectedDeckId)
        // setDeckID(selectedDeckId)
        // setDeckFormat(selectedDeckData.format)
        setDeckData(selectedDeckData)
    }

    const handleAddToDeck = (cardData) => {
        if (deckData === null) {
            alert('Select a deck first');
            return;
        }
        detailedLog(cardData)
        const checkIfLegal = checkFormatLegality(cardData, store.savedDecks, deckData.id, true);
        const maxCardCheck = checkMaxQty(deckData, cardData, parseInt(changeVal))
        const deckSizeCheck = checkDeckSize(deckData, deckData.card_total + parseInt(changeVal))

        if (checkIfLegal !== true) {
            alert(`"${deckData.deckname}" is a deck in the ${deckData.format} format. ${cardData.cardname} is not legal in the ${checkIfLegal} format`);
        } else if (maxCardCheck != true) {
            alert(maxCardCheck)
        } else if (typeof deckSizeCheck === "string") {
            alert(deckSizeCheck)
        } else {
            actions.addSavedCardToDeck(deckData.id, cardData, parseInt(changeVal));
        }

        setChangeVal(1);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="m-2">
                <select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target)}>
                    <option value="">Select a saved deck</option>
                    {store.savedDecks.map((deckEntry) => (
                    <option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
                    ))}
                </select>
                <input 
                    type="text"
                
                    placeholder="(optional) Card quantity"
                    value={changeVal}
                    onChange={event => setChangeVal(event.target.value)}
                ></input>
                <button className="ms-1" onClick={() => handleAddToDeck(cardEntry)}>Add to deck</button>
            </div>

            <div className="mb-2">
                <button onClick={() => handleDelete(cardEntry)}>Delete this card</button>
                <button onClick={() => console.log(cardEntry.colors)}>C</button>
            </div>
            
        </div>
    )
}