import React, { useContext } from "react";

import { Context } from "../../store/appContext";
import { SavedCardInGrid } from "./savedCardSingle.jsx";
import { SavedCardControls } from "./savedCardSingleControls.jsx";

export const SavedCardsGrid = () => {
    const { store, actions } = useContext(Context);

    const gridBuilder = () => {
        if (store?.savedCards[0] == "default") {
            return <h1>Loading saved cards...</h1>;
        } else if (store.savedCards.length > 0) {
            return (
                <>
                    <div className="d-flex flex-wrap">
                        {store.savedCards.map((entry) => (
                            <div className="d-flex flex-column align-items-center" key={entry.id}>
                                <SavedCardInGrid key={`img ${entry.id}`} cardData={entry} />
                                <h5>
                                    {entry.cardname} {entry.back_side && (`// ${entry.back_side[0].cardname}`)}
                                </h5>
                                <SavedCardControls key={`ctrl ${entry.id}`} cardData={entry} />
                            </div>
                        ))}
                    </div>
                </>
            );
        } else {
            return <h1>No saved cards</h1>;
        };
    };

    return (
        <>
            {gridBuilder()}
        </>
    );
};