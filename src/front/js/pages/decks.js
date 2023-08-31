import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";

import { SavedDecksDisplay } from "../component/savedDecks/savedDecksDisplay.jsx";

export const SavedDecks = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div>
                    <h1>{localStorage.getItem("username")}'s saved decks</h1>
            </div>
            <SavedDecksDisplay />
        </div>
    )
}