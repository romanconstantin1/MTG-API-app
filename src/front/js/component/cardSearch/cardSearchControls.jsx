import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

import { checkFormatLegality } from "../../utils/checkLegality";

export const CardSearchControls = () => {
    const { store, actions } = useContext(Context)
	const [ deckID, setDeckID ] = useState('')
	const [ cardQty, setCardQty ] = useState(undefined)
    
    const handleSelectDeck = (IDval) => setDeckID(IDval)

	const handleSaveCard = () => {
		if (JSON.stringify(store.searchedCard) !== JSON.stringify({name: null, image_uris: {normal: null}})) {
			actions.saveCardToDB(store.searchedCard)
		} else {
			alert('Search for a card to add first')
		}
	}

	const handleCardQty = (qty) => setCardQty(qty)

	const handleAddToDeck = async () => {
		if (deckID === '') {
            alert('Select a deck first');
            return;
        }
	  
		if (store.searchedCard.name === null) {
		  	alert('Search for a card to add first');
		  	return;
		}
		const checkIfLegal = checkFormatLegality(store.searchedCard, store.savedDecks, deckID, false);
        
        if (checkIfLegal === true) {
		  	await actions.addNewCardToDeck(deckID, cardQty)
		} else {
		  	alert(`${store.searchedCard.name} is not legal in the ${checkIfLegal} format`);
		}
	}

    return (
        <>
            <button className = "mx-2" onClick={() => handleAddToDeck()}>Add to deck</button>

			<select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target.value)}>
                <option value="">Select a saved deck</option>
                    {store.savedDecks.map((deckEntry) => (
                    <option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
                ))}
            </select>

			<select className="mx-2" name="decks" id="quantity-select" onChange={(event) => handleCardQty(event.target.value)}>
				<option value="test">(optional) Card quantity</option>
			</select>

			<div>
				<button className="m-2" onClick={() => handleSaveCard()}>Save this card to collection</button>
			</div>
        </>
    )
}