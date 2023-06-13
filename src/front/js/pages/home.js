import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { CardSearchBar } from "../component/cardSearch/cardSearchBar.jsx";

import { checkFormatLegality } from "../utils/checkLegality";
import { checkMaxQty } from "../utils/checkMaxQty";
import "../../styles/home.css";

export const Home = () => {
	return (
		<div className="d-flex flex-column align-items-center">
			<CardSearchBar />
		</div>
	)
	// const { store, actions } = useContext(Context)
	// const [ deckID, setDeckID ] = useState('')
	// const [ cardQty, setCardQty ] = useState(undefined)
	// // const handleClick = () => {
	// // 	actions.getRandomCards()
	// // }


	// const handleSelectDeck = (IDval) => setDeckID(IDval)

	// const handleSaveCard = () => {
	// 	if (JSON.stringify(store.searchedCard) !== JSON.stringify({name: null, image_uris: {normal: null}})) {
	// 		actions.saveCardToDB(store.searchedCard)
	// 	} else {
	// 		alert('Search for a card to add first')
	// 	}
	// }

	// const handleCardQty = (qty) => setCardQty(qty)

	// const handleAddToDeck = async () => {
	// 	if (deckID === '') {
    //         alert('Select a deck first');
    //         return;
    //     }
	  
	// 	if (store.searchedCard.name === null) {
	// 	  	alert('Search for a card to add first');
	// 	  	return;
	// 	}
	// 	const checkIfLegal = checkFormatLegality(store.searchedCard, store.savedDecks, deckID, false);
	// 	if (checkIfLegal === true) {
	// 	  	const addedCard = await actions.addNewCardToDeck(deckID, cardQty);
	// 		console.log(addedCard)
	// 	} else {
	// 	  	alert(`${store.searchedCard.name} is not legal in the ${checkIfLegal} format`);
	// 	}
	// }

	// return (
	// 	<div className="text-center mt-5">
	// 		{/* <h1>Hello Rigo!!</h1> */}
	// 		{/* <DeckCreator />
	// 		<button onClick={() => handleClick()}>Find a random commander</button>
	// 		<h3>Your random commander is</h3>
	// 		<h1>{store.randomCard}</h1> */}
	// 		<div>
	// 			<h1>{store.searchedCard.name}</h1>

	// 			<button className = "mx-2" onClick={() => handleAddToDeck()}>Add to deck</button>
	// 			<select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target.value)}>
	// 				<option value="">Select a saved deck</option>
	// 				{store.savedDecks.map((deckEntry) => (
	// 				<option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
	// 				))}
	// 			</select>
	// 			<select className="mx-2" name="decks" id="quantity-select" onChange={(event) => handleCardQty(event.target.value)}>
	// 				<option value="test">(optional) Card quantity</option>
	// 			</select>
	// 		</div>
	// 		<div>
	// 			<button className="m-2" onClick={() => handleSaveCard()}>Save this card to collection</button>
	// 		</div>
			
	// 		<img loading="lazy" src={store.searchedCard.image_uris.normal} />
			
	// 		{/* <p>
	// 			<img src={rigoImageUrl} />
	// 		</p>
	// 		<div className="alert alert-info">
	// 			{store.message || "Loading message from the backend (make sure your python backend is running)..."}
	// 		</div>
	// 		<p>
	// 			This boilerplate comes with lots of documentation:{" "}
	// 			<a href="https://start.4geeksacademy.com/starters/react-flask">
	// 				Read documentation
	// 			</a>
	// 		</p> */}
	// 	</div>
	// );
};
