import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

export const CardInDeckControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleAddCard = () =>{
        actions.changeCardQuantity(deckData.id, cardData, 1)
        console.log(cardData.quantity)
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
            <button onClick={() => handleAddCard()}>+</button>
            <button onClick={() => handleSubtractCard()}>-</button>
            <button onClick={() => handleDeleteCard()}>Delete this card</button>
        </>
    )
}