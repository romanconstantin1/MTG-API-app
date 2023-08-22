import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../store/appContext";

import { checkMaxQty } from "../../utils/checkMaxQty";
import { checkDeckSize, checkSideboardSize } from "../../utils/checkDeckSize";
import { bool, string } from "prop-types";

export const CardInDeckControls = (props) => {
    const { store, actions } = useContext(Context)
    const cardData = props.props[0]
    const deckData = props.props[1]
    const [ changeVal, setChangeVal ] = useState(1)

    const handleAddCard = () => {
        const maxCardCheck = checkMaxQty(deckData, cardData, parseInt(changeVal))
        const deckSizeCheck = checkDeckSize(deckData, deckData.card_total + parseInt(changeVal))

        if (maxCardCheck != true) {
            alert(maxCardCheck)
        } else if (typeof deckSizeCheck === "string") {
            alert(deckSizeCheck)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, parseInt(changeVal))
        }    
        
        setChangeVal(1)
    }

    const handleSubtractCard = () => {
        if (cardData.quantity - 1 <= 0) {
            actions.deleteCardFromDeck(deckData.id, cardData)
        } else {
            actions.changeCardQuantity(deckData.id, cardData, parseInt(changeVal) * -1)
            console.log(cardData.quantity)
        }
        setChangeVal(1)
    }

    const handleMoveToSideboard = () => {
        const sideboardSizeCheck = checkSideboardSize(deckData, deckData.sideboard_total + 1)
        if (typeof sideboardSizeCheck === "string") {
            alert(sideboardSizeCheck)
        } else {
            actions.moveToSideboard(deckData.id, cardData)
        }
    }

    const handleDeleteCard = () => {
        actions.deleteCardFromDeck(deckData.id, cardData)
    }

    // const handleView = () => {
    //     console.log(deckData)
    // }

    return (
        <>
            <input 
                type="number" 
                min="1" max="100" 
                value={changeVal} 
                onChange={event => setChangeVal(event.target.value)}
            ></input>

            <button className="mx-1" onClick={handleAddCard}>+</button>
            <button onClick={handleSubtractCard}>-</button>
            <button className="mx-1" onClick={handleDeleteCard}>Delete from main deck</button>
            {deckData.sideboard && deckData.sideboard_total !== undefined && (
                <button className="mx-1" onClick={handleMoveToSideboard}>Move 1 to sideboard</button>
            )}
            {/* <button className="mx-1" onClick={() => handleView()}>Test</button> */}
        </>
    )
}