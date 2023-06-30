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

    const cardDisplayBuilder = () => {
        return (
        <>
            <h1>{cardData.cardname}</h1>
            <img src={cardData.image_normal} />
            {cardData.back_side && (
                <>
                    <h1>{cardData.back_side[0].cardname}</h1>
                    <img src={cardData.back_side[0].image_normal} />
                </>
            )}
        </>
        )
    }
    return (
        <div>
            {cardDisplayBuilder()}
        </div>
    );
};