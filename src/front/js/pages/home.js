import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { checkFormatLegality } from "../utils/checkLegality";
import { checkMaxQty } from "../utils/checkMaxQty";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context)
	const [deckID, setDeckID] = useState('')

	// const handleClick = () => {
	// 	actions.getRandomCards()
	// }


	const handleSelectDeck = (IDval) => setDeckID(IDval)

	const handleSaveCard = () => {
		if (JSON.stringify(store.searchedCard) !== JSON.stringify({name: null, image_uris: {normal: null}})) {
			actions.saveCardToDB(store.searchedCard)
		} else {
			alert('Search for a card to add first')
		}
	}

	const handleAddToDeck = () => {
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
		  	actions.addNewCardToDeck(deckID);
		} else {
		  	alert(`${store.searchedCard.name} is not legal in the ${checkIfLegal} format`);
		}
	}

	return (
		<div className="text-center mt-5">
			{/* <h1>Hello Rigo!!</h1> */}
			{/* <DeckCreator />
			<button onClick={() => handleClick()}>Find a random commander</button>
			<h3>Your random commander is</h3>
			<h1>{store.randomCard}</h1> */}
			<div>
				<h1>{store.searchedCard.name}</h1>
				<label htmlFor="deck-select">Add to deck:</label>
				<select name="decks" id="deck-select" onChange={(event) => handleSelectDeck(event.target.value)}>
					<option value="">Select a saved deck</option>
					{store.savedDecks.map((deckEntry) => (
					<option key={deckEntry.id} value={deckEntry.id}>{deckEntry.deckname}</option>
					))}
				</select>
				
				<button onClick={() => handleAddToDeck()}>Add to deck</button>
				<button onClick={() => handleSaveCard()}>Save this card to collection</button>
				{/* <div className="dropdown mx-2">
					<button onClick={handleOpen}>{deckName}</button>
						{open ? (
							<ul className="menu search_dropdown">
								{store.savedDecks.map(entry => (
									<>
									<li className="menu-item" key={entry.id}>
										<div onClick={() => {
											handleSetDeckName(entry.deckname),
											handleSetDeckID(entry.id)
											}}>
											<h6>{entry.deckname}</h6>
										</div>
										
									</li>
									</>
									))
								}    
							</ul>
						) : null}
            	</div> */}
			</div>
			
			<img src={store.searchedCard.image_uris.normal} />
			
			{/* <p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
		</div>
	);
};
