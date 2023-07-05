import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { CardSearchControls } from "./cardSearchControls.jsx";
import { detailedLog } from "../../utils/detailedLog";
import { cardDisplayBuilder } from "../../utils/cardDisplayBuilder";

export const IsSingleFaced = () => {
    const { store } = useContext(Context)
    useEffect(()=> {
        detailedLog(store.searchedCard)
    },[store.searchedCard])

    return (
        <>
            <div>
                <h1>{store.searchedCard.name}</h1>

                <h5>Login or create an account to save this card</h5>
                <CardSearchControls />
            </div>
            {cardDisplayBuilder(store.searchedCard)}
        </>
    )
}