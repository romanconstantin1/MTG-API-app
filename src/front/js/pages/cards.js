import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { SavedCardsGrid } from "../component/savedCards/savedCardsGrid.jsx";

export const SavedCards = () => {
    const { store, actions } = useContext(Context);
    //do other stuff here eventually
    //for now, just call component & return the grid of cards

    return (
        <div>
            <SavedCardsGrid />
            {/* {console.log("return")}
            {console.log(store.savedCards)} */}
            {/* {savedCards.map(entry => <img src={entry.image} />)} */}
        </div>
    )
}