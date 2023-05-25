import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { CardSearchBar } from "../component/cardSearchBar.jsx";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	const handleClick = () => {
		actions.getRandomCards()
	}

	return (
		<div className="text-center mt-5">
			{/* <h1>Hello Rigo!!</h1> */}
			<button onClick={() => handleClick()}>Find a random commander</button>
			<h3>Your random commander is</h3>
			<h1>{store.randomCard}</h1>
			<h3>The card you searched for is</h3>
			<img src={store.searchedCardImg} />
			<h1>{store.searchedCard.name}</h1>
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
