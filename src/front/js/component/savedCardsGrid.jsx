import React, { useContext } from "react";

import { Context } from "../store/appContext";
import { SavedCardInGrid } from "./savedCards/savedCardGridView.jsx";

export const SavedCardsGrid = () => {
    const { store, actions } = useContext(Context);

    const gridBuilder = () => {
        if (store.savedCards.length > 0) {
            return (
                <div className="d-flex flex-wrap">
                    {store.savedCards.map((entry) => (
                        <div className="d-flex align-items-center" key={entry.id}>
                            <SavedCardInGrid key={entry.id} cardData={entry} />
                        </div>
                    ))}
                </div>
            );
        } else if (store.savedCards.length <= 0) {
            return <h1>No saved cards</h1>;
        } else {
            return <h1>Loading...</h1>;
        }
    };

    return (
        <>
            {gridBuilder()}
    
        </>
    );
};