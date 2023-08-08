import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

import { checkMaxQty } from "../../utils/checkMaxQty";
import { checkDeckSize } from "../../utils/checkDeckSize";
import { bool, string } from "prop-types";

export const CardInSideboardControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleAddCard = () => {
        // const maxCardCheck = checkMaxQty(deckData, cardData, cardData.quantity + 1)
        // const deckSizeCheck = checkDeckSize(deckData, deckData.card_total + 1)

        if (maxCardCheck != true) {
            alert(maxCardCheck)
        } else if (typeof deckSizeCheck === "string") {
            alert(deckSizeCheck)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, 1)
        }     
    }

    const handleSubtractCard = () => {
        if (cardData.quantity - 1 <= 0) {
            actions.deleteCardFromDeck(deckData.id, cardData)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, -1)
            console.log(cardData.quantity)
        }
    }

    const handleMoveToMaindeck = () => {
        actions.moveToMaindeck(deckData.id, cardData)
    }

    const handleDeleteCard = () => {
        actions.deleteCardFromSideboard(deckData.id, cardData)
    }

    const handleView = () => {
        console.log(cardData)
    }

    return (
        <>
            <button className="mx-1" onClick={() => handleDeleteCard()}>Delete from sideboard</button>
            <button className="mx-1" onClick={() => handleMoveToMaindeck()}>Move to main deck</button>
            {/* <button className="mx-1" onClick={() => handleView()}>Test</button> */}
        </>
    )
}