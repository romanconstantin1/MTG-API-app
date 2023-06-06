import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

export const CardInDeckControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props
    
    const handleAddCard = () =>{
        console.log(`add 1 ${cardData.cardname}`)
    }

    const handleSubtractCard = () => {
        console.log(`subtract 1 ${cardData.cardname}`)
    }

    const handleDeleteCard = () => {
        console.log(`delete ${cardData.cardname}`)
    }

    return (
        <>
            <button onClick={() => handleAddCard()}>+</button>
            <button onClick={() => handleSubtractCard()}>-</button>
            <button onClick={() => handleDeleteCard()}>Delete this card</button>
        </>
    )
}