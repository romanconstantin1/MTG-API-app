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
            <div>
                <h1>{localStorage.getItem("username")}'s saved cards</h1>
            </div>
            <SavedCardsGrid />
        </div>
    )
}