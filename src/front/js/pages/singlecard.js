import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { detailedLog } from "../utils/detailedLog";
import { cardDisplayBuilder } from "../utils/cardDisplayBuilder";

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

    return (
        <div>
            {cardDisplayBuilder(cardData)}
            {cardData.back_side && (
                cardDisplayBuilder(cardData.back_side[0])
            )}
        </div>
    );
};