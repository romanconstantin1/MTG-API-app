import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const loggedInUsername = localStorage.getItem("username");
	
	const handleClickSearch = () => {
		actions.resetSearch();
	}

	const handleLogout = () => {
		actions.logoutUser();
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" onClick={() => handleClickSearch()}>
					<span className="navbar-brand mb-0 h1">search</span>
				</Link>

				{!loggedInUsername ? (
						<>
							<Link to="/login">
								<span className="navbar-brand mb-0 h1">log in</span>
							</Link>
							<Link to="/signup">
								<span className="navbar-brand mb-0 h1">sign up</span>
							</Link>
						</>
					) : (
						<>
							<Link to="/create_new_deck">
								<span className="navbar-brand mb-0 h1">new deck</span>
							</Link>

							<Link to="/decks">
								<span className="navbar-brand mb-0 h1">saved decks</span>
							</Link>

							<Link to="/cards">
								<span className="navbar-brand mb-0 h1">saved cards</span>
							</Link>

							<Link to="/" onClick={() => handleLogout()}>
								<span className="navbar-brand mb-0 h1">log out</span>
							</Link>

							<h4>hi, {loggedInUsername}</h4>
						</>
					)}
				
				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
			</div>
		</nav>
	);
};
