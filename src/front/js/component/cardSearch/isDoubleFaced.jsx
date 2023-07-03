import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { CardSearchControls } from "./cardSearchControls.jsx";
import { detailedLog } from "../../utils/detailedLog";
import { cardDisplayBuilder } from "../../utils/cardDisplayBuilder";

export const IsDoubleFaced = () => {
    const { store } = useContext(Context)
    
    useEffect(()=> {
        detailedLog(store.searchedCard)
    },[store.searchedCard])
    
    return (
        <>
            <div>
                <h1>{store.searchedCard.name}</h1>
                <CardSearchControls />
            </div>

            {/* card front */}
            <div>
                {cardDisplayBuilder(store.searchedCard, store.searchedCard.card_faces[0])}
            </div>

            {/* card back */}
            <div>
                {cardDisplayBuilder(store.searchedCard, store.searchedCard.card_faces[1])}
            </div>
        </>
    );
};