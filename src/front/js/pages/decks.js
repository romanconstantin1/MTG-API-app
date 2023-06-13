import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { SavedDecksDisplay } from "../component/savedDecks/savedDecksDisplay.jsx";
import { DeckCreator } from "../component/deckCreator.jsx";

export const SavedDecks = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <DeckCreator />
            <SavedDecksDisplay />
            {/* {console.log("return")}
            {console.log(store.savedCards)} */}
            {/* {savedCards.map(entry => <img src={entry.image} />)} */}
        </div>
    )
}