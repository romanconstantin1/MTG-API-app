import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

export const CardInSideboardControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleMoveToMaindeck = () => {
        actions.moveToMaindeck(deckData.id, cardData)
    }

    const handleDeleteCard = () => {
        actions.deleteCardFromSideboard(deckData.id, cardData)
    }

    // const handleView = () => {
    //     console.log(cardData)
    // }

    return (
        <>
            <button className="mx-1" onClick={() => handleDeleteCard()}>Delete from sideboard</button>
            <button className="mx-1" onClick={() => handleMoveToMaindeck()}>Move to main deck</button>
            {/* <button className="mx-1" onClick={() => handleView()}>Test</button> */}
        </>
    )
}