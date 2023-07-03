import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CardSearchBar } from "./cardSearch/cardSearchBar.jsx";

import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const handleClick = () => {
		actions.resetSearch()
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{/* <Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link> */}
				<Link to="/" onClick={() => handleClick()}>
					<span className="navbar-brand mb-0 h1">search</span>
				</Link>
				<Link to="/cards">
					<span className="navbar-brand mb-0 h1">saved cards</span>
				</Link>
				<Link to="/decks">
					<span className="navbar-brand mb-0 h1">saved decks</span>
				</Link>
				<div>
					<Link to="/login">
						<span className="navbar-brand mb-0 h1">log in</span>
					</Link>
					<Link to="/signup">
						<span className="navbar-brand mb-0 h1">sign up</span>
					</Link>
				</div>
				
				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
			</div>
		</nav>
	);
};
