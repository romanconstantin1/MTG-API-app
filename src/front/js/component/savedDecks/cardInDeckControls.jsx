import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

import { checkMaxQty } from "../../utils/checkMaxQty";

export const CardInDeckControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleAddCard = () => {
        const maxCheck = checkMaxQty(deckData, cardData, cardData.quantity + 1)
        if (maxCheck === true) {
            actions.changeCardQuantity(deckData.id, cardData, 1)
        } else {
            alert(maxCheck)
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

    const handleDeleteCard = () => {
        actions.deleteCardFromDeck(deckData.id, cardData)
    }

    return (
        <>
            <button className="mx-1" onClick={() => handleAddCard()}>+</button>
            <button onClick={() => handleSubtractCard()}>-</button>
            <button className="mx-1" onClick={() => handleDeleteCard()}>Delete this card</button>
        </>
    )
}