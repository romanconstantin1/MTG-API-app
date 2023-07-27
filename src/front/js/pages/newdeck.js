import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { DeckCreator } from "../component/deckCreator.jsx";

export const NewDeck = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Create a new deck</h1>
            <DeckCreator />
        </div>
    );
};