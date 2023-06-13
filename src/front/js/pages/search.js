import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { checkFormatLegality } from "../utils/checkLegality";

import { CardSearchControls } from "../component/cardSearch/cardSearchControls.jsx";

export const Search = () => {
	const { store } = useContext(Context)
	// const handleClick = () => {
	// 	actions.getRandomCards()
	// }

	const searchDisplayBuilder = () => {
		return (
			<>
				<div>
					<h1>{store.searchedCard.name}</h1>
					<CardSearchControls />
				</div>
				<div className="justify-text">
					<h3>Mana cost: {store.searchedCard.mana_cost}</h3>
					<h3>CMC: {store.searchedCard.cmc}</h3>
					<h3>Type: {store.searchedCard.type_line}</h3>
					<h3>Rules text:</h3>
					<h5>{store.searchedCard.oracle_text}</h5>
					<h3>Flavor text:</h3>
					<h5>{store.searchedCard.flavor_text}</h5>
				</div>
				<img loading="lazy" src={store.searchedCard.image_uris.normal} />
			</>
		)
	}

	return (
		<div className="text-center mt-5">
			{/* <h1>Hello Rigo!!</h1> */}
			{/* <DeckCreator />
			<button onClick={() => handleClick()}>Find a random commander</button>
			<h3>Your random commander is</h3>
			<h1>{store.randomCard}</h1> */}
			{searchDisplayBuilder()}
			
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

// 	const { store, actions } = useContext(Context);
// 	const params = useParams();

// 	return (
// 		<div className="jumbotron">
// 			<h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1>
// 			<img src={rigoImageUrl} />
// 			<hr className="my-4" />

// 			<Link to="/">
// 				<span className="btn btn-primary btn-lg" href="#" role="button">
// 					Back home
// 				</span>
// 			</Link>
// 		</div>
// 	);
// };

// Single.propTypes = {
// 	match: PropTypes.object
// };
