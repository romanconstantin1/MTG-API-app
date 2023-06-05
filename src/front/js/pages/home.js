import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { DeckCreator } from "../component/deckCreator.jsx";
import { checkFormatLegality } from "../utils/checkLegality";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [deckName, setDeckName] = useState('Select a deck')
	const [deckID, setDeckID] = useState('')
    const [open, setOpen] = useState(false)

	// const handleClick = () => {
	// 	actions.getRandomCards()
	// }

	const handleOpen = () => {
        setOpen(!open);
    };
	const handleSetDeckName = (name) => {
        setDeckName(name);
    }

	const handleSetDeckID = (id) => {
		setDeckID(id);
	}

	const handleSaveCard = () => {
		actions.saveCardToDB(store.searchedCard)
	}

	const handleAddToDeck = () => {
		if (deckName == 'Select a deck') {
			alert("select a deck first")
		} else if (store.searchedCard.name == null){
			alert("search for a card to add first")
		} else {
			if (checkFormatLegality(store.searchedCard, store.savedDecks, deckID, false)) {
				actions.addNewCardToDeck(deckID)
			} else {
				alert(`${store.searchedCard.name} is not legal for this deck`)
			}
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
				<button onClick={() => handleSaveCard()}>Save this card to collection</button>
				<button onClick={() => handleAddToDeck()}>Add to deck:</button>
				<div className="dropdown mx-2">
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
            	</div>
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
