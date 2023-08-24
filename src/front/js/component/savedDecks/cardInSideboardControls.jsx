import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";
import { checkMaxQty } from "../../utils/checkMaxQty";
import { checkDeckSize, checkSideboardSize } from "../../utils/checkDeckSize";

export const CardInSideboardControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleAddCard = () => {
        const maxCardCheck = checkMaxQty(deckData, cardData, 1)
        const sideboardSizeCheck = checkSideboardSize(deckData, deckData.sideboard_total + 1)
        
        if (maxCardCheck != true) {
            alert(maxCardCheck)
        } else if (typeof sideboardSizeCheck === "string") {
            alert(sideboardSizeCheck)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, 1, true)
        }   
    }

    const handleSubtractCard = () => {
        if (cardData.quantity - 1 <= 0) {
            actions.deleteCardFromSideboard(deckData.id, cardData)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, -1, true)
        }
    }

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
            <button className="mx-1" onClick={handleAddCard}>+</button>
            <button onClick={handleSubtractCard}>-</button>
            <button className="mx-1" onClick={() => handleDeleteCard()}>Delete from sideboard</button>
            <button className="mx-1" onClick={() => handleMoveToMaindeck()}>Move 1 to main deck</button>
            {/* <button className="mx-1" onClick={() => handleView()}>Test</button> */}
        </>
    )
}