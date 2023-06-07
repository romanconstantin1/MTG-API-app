import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

export const CardInDeckControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]

    const handleAddCard = () =>{
        actions.changeCardQuantity(deckData.id, cardData, 1)
    }

    const handleSubtractCard = () => {
        if (cardData.quantity - 1 <= 0) {
            alert("delete this card")
        } else {
            actions.changeCardQuantity(deckData.id, cardData, -1)
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