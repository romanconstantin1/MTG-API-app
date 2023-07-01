import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { detailedLog } from "../utils/detailedLog";

export const SingleCard = () => {
    const { store } = useContext(Context)
    
    const { carddata } = useParams();
    const decodedData = decodeURIComponent(carddata);
    const parsedData = JSON.parse(decodedData);
    const [ cardData, setCardData ] = useState({"cardname": "Loading...", "image_normal": null})

    useEffect(() => {
        if (store.savedCards.length > 0) {
            getCard()
        }
    }, [store.savedCards])
    
    const getCard = () => {
        const cardToFind = store.savedCards.find(foundCard => 
            foundCard.id === parsedData.id && foundCard.cardname === parsedData.cardname);
        
        if (cardToFind == undefined) {
            setCardData({"cardname": "No card found!", "image_normal": null})
        } else {
            setCardData(cardToFind)
        }    
    }
    detailedLog(cardData)

    const cardDisplayBuilder = (passedCardData) => {
        return (
        <div className="container">
            <div className="row">
                <h1>{passedCardData.cardname}</h1>
                <div className="col">
                    <img src={passedCardData.image_normal} />
                </div>

                <div className="col">
                    {passedCardData.mana_cost && (
                        <h5>Mana Cost: {passedCardData.mana_cost}</h5>
                    )}
                    <h5>Type: {passedCardData.card_type}</h5>
                    {passedCardData.loyalty && (
                        <h5>Starting Loyalty: {passedCardData.loyalty}</h5>
                    )}
                    {passedCardData.defense && (
                        <h5>Defense: {passedCardData.defense}</h5>
                    )}
                    {passedCardData. power && passedCardData.toughness && (
                        <h5>P/T: {passedCardData.power}/{passedCardData.toughness}</h5>
                    )}
                    {passedCardData.oracle_text && (
                        <h5>Rules Text: {passedCardData.oracle_text}</h5>
                    )}
                    {passedCardData.flavor_text && (
                        <h5>Flavor Text: <i>{passedCardData.flavor_text}</i></h5>
                    )}
                </div>
                
            </div>
        </div>
        )
    }
    return (
        <div>
            {cardDisplayBuilder(cardData)}
            {cardData.back_side && (
                cardDisplayBuilder(cardData.back_side[0])
            )}
        </div>
    );
};